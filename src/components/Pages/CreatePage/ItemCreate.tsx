import React, { useEffect, useRef, useState } from "react";
import ItemCategories from "../ItemPage/subComponent/ItemCategories";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import ImageUploader from "../../Modules/ImageUploader";
import ItemTags from "./ItemTags";
import CustomInput from "../../Modules/Custom/CustomInput";
import CustomDatePicker from "../../Modules/Custom/CustomDatePicker";
import CustomButton from "../../Modules/Custom/CustomButton";
import { Alert, Autocomplete, Slide, Snackbar, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import * as amplitude from "@amplitude/analytics-browser";
import { useNavigate, useParams } from "react-router-dom";
import { fetchItems, getCompany, postItem, putItem } from "../../../api/Item";
import { dateFormatter } from "../../../hooks/apiHook";
import LoadingSpinner from "../../Modules/LoadingSpinner";
import { Edit } from "@mui/icons-material";
import { setGuide } from "../../../store/userSlice";
import CustomText from "../../Modules/Custom/CustomText";

type Props = {
  adjust?: itemRegister;
};
interface itemRegister {
  categoryContent: string;
  itemTagList: string[];
  itemRecord: string;
  pictures: string[];
  date?: Date;
  company?: string;
  order?: number;
  companyId?: number;
}
const itemRecord = {
  state: "itemRecord" as const,
  title: "일정 기록",
  placeholder: "일정에 대한 상세한 기록을 작성해주세요",
  multiline: true,
  textCount: true,
};
const company = {
  state: "company" as const,
  title: "업체명",
  placeholder: "업체명을 기입해주세요",
};

const alertMessage = {
  tag: "태그를 한 개 이상 선택해주세요!",
  inputs: "입력되지 않은 항목이 있습니다!",
};

const dummyAutoComplete = [
  { label: "지타워컨벤션", id: 1 },
  { label: "참좋은웨딩", id: 2 },
  { label: "더파티움", id: 3 },
  { label: "프리미엄웨딩", id: 4 },
  { label: "더플라자", id: 5 },
];
type CompanyList = {
  name: string;
  companyId: number | undefined;
  liked: boolean;
  category: string | undefined;
}[];

const ItemCreate = (props: Props) => {
  const guide = useSelector((state: RootState) => state.user.guide);
  const methods = useForm<itemRegister>({});

  const [companyValue, setCompanyValue] = useState<string>("");
  const [companyLIst, setCompanyList] = useState<CompanyList>([]);
  const [isEdit, setIsEdit] = useState<null | number>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initTags, setInitTags] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>(
    alertMessage.tag
  );

  const itemId = useParams().itemId;
  const order = useParams().order;
  const portfolioId = useParams().portfolioId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const snackbarClose = () => {
    setOpenSnackbar(false);
  };
  const setForm = (data?: itemRegister) => {
    if (data) {
      methods.reset(data);
      setInitTags(data.itemTagList);
    } else {
      methods.reset();
      setInitTags([]);
    }
  };

  const getInitData = async (itemId: number) => {
    setIsEdit(itemId);
    const res = await fetchItems(itemId);
    if (res?.status === "SUCCESS" && res.data.typeTag === "item") {
      const data = res.data;
      const itemTagList = data.itemTagList.split(",");
      const categoryContent = data.category;
      // const date = new Date(data.date);
      // const company = data.company;
      const pictures = data.imageList;
      const itemRecord = data.itemRecord;
      const form: itemRegister = {
        itemTagList,
        categoryContent,
        pictures,
        itemRecord,
        // date,
        // company,
        order: res.data.order,
      };
      if (data.date) {
        form.date = new Date(data.date);
      }
      if (data.companyName) {
        form.company = data.companyName;
      }

      setForm(form);
    }
  };
  const companySearch = (e: string) => {
    setCompanyValue(e);
  };

  const onSubmit: SubmitHandler<itemRegister> = async (data) => {
    if (!portfolioId) return alert("잘못된 접근입니다. - itemCreate");
    const category = data.categoryContent;
    if (!data.itemTagList || data.itemTagList.length === 0) {
      setOpenSnackbar(true);
      setSnackbarMessage(alertMessage.tag);
      return;
    } else if (!data.itemRecord) {
      setOpenSnackbar(true);
      setSnackbarMessage(alertMessage.inputs);
      return;
    }

    const body: ItemBody = {
      itemRecord: data.itemRecord,
      portfolioId: parseInt(portfolioId),
      category: category.replace(/(\s*)/g, ""),
      imageList: data.pictures,
      itemTagList: data.itemTagList.join(","),
      // company: data.company,
      // date: dateFormatter(data.date),
      order: data.order,
    };
    if (data.company) {
      body.companyName = data.company;
    }
    if (data.companyId) {
      body.companyId = data.companyId;
    }
    if (data.date) {
      body.date = dateFormatter(data.date);
    }

    if (!isEdit) {
      if (!order) return;
      body.order = parseInt(order);
      const res = await postItem(body);
      if (res.status === "SUCCESS") {
        console.log(guide);
        if (guide && !guide?.item) {
          dispatch(setGuide("item"));
          amplitude.track("OpenEvent-item");
        }
        setLoading(true);
        setForm();
        setTimeout(() => {
          setLoading(false);
          navigate(-1);
        }, 1000);
        return;
      }
      console.log("아이템 등록에 실패했습니다.");
    } else {
      const res = await putItem(isEdit, body);
      if (res.status === "SUCCESS") {
        setLoading(true);
        setForm();
        setTimeout(() => {
          setLoading(false);
          navigate(-1);
        }, 1000);
        return;
      }
      console.log("아이템 수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!itemId || !portfolioId) return;
    const isValidItemId = parseInt(itemId);
    const isValidPortfolioId = parseInt(portfolioId);
    if (!isValidItemId || !isValidPortfolioId) return;
    getInitData(isValidItemId);
  }, [itemId]);

  useEffect(() => {
    const DELAY = 500;
    const timerId = setTimeout(async () => {
      // fetch
      console.log("debounce!");
      const res: any = await getCompany(companyValue);
      console.log(res);
      if (res?.data.length === 0) {
        setCompanyList([
          {
            name: `${companyValue}`,
            companyId: undefined,
            liked: false,
            category: undefined,
          },
        ]);
      } else {
        setCompanyList([...res?.data]);
      }
    }, DELAY);
    return () => clearTimeout(timerId);
  }, [companyValue]);

  return (
    <>
      {/* <div>
        <Header />
      </div> */}

      <Slide
        className='overflow-y-scroll px-4 mb-2 flex-1 flex'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='w-full h-full px-4 flex flex-col '>
          {loading && (
            <div className='absolute backdrop-blur-sm w-full h-full z-50'>
              <LoadingSpinner />
            </div>
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-6 flex-1 justify-between pt-6'
            >
              <div className='flex flex-col gap-6'>
                <ItemCategories required />
                <ImageUploader
                  title='image'
                  maxCount={5}
                  isImmediately={true}
                  required
                />
                <ItemTags
                  formState='itemTagList'
                  initValue={initTags}
                  required
                />
                <CustomInput content={itemRecord} required />
                <div className='flex flex-col flex-1'>
                  <div className='mb-1'>
                    <CustomText type='Title' text={"업체명"} />
                  </div>
                  <Autocomplete
                    options={companyLIst}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, v) => {
                      console.log(e, v);
                      methods.setValue("companyId", v?.companyId);
                      methods.setValue("company", v?.name);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => {
                          companySearch(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
                <CustomDatePicker state='date' />
                {/* <CustomInput content={company} /> */}
              </div>
              <CustomButton
                text='아이템 추가'
                flag={false}
                buttonType='submit'
              />
            </form>
          </FormProvider>
          <Snackbar
            open={openSnackbar}
            onClose={snackbarClose}
            autoHideDuration={1500}
          >
            <Alert severity='error'>{snackbarMessage}</Alert>
          </Snackbar>
        </div>
      </Slide>
    </>
  );
};

export default ItemCreate;
