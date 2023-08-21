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
import CustomInput from "../../Modules/CustomInput";
import CustomDatePicker from "../../Modules/CustomDatePicker";
import CustomButton from "../../Modules/CustomButton";
import { Alert, Slide, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../../store/viewSlice";
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, postItem, putItem } from "../../../api/Item";
import { dateFormatter } from "../../../hooks/apiHook";
import LoadingSpinner from "../../Modules/LoadingSpinner";
import { Edit } from "@mui/icons-material";

type Props = {
  adjust?: itemRegister;
};
interface itemRegister {
  categoryContent: string;
  itemTagList: string[];
  itemRecord: string;
  pictures: string[];
  date: Date;
  company: string;
  order?: number;
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
const ItemCreate = (props: Props) => {
  const methods = useForm<itemRegister>({});
  const [isEdit, setIsEdit] = useState<null | number>(null);
  const [loadging, setLoadging] = useState<boolean>(false);
  const [initTags, setInitTags] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>(
    alertMessage.tag
  );

  const itemId = useParams().itemId;
  const order = useParams().order;
  const portfolioId = useParams().portfolioId;
  const navigate = useNavigate();

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
    const res = await getItem("item", itemId);
    if (res?.status === "SUCCESS" && res.data.typeTag === "item") {
      const data = res.data;
      const itemTagList = data.itemTagList.split(",");
      const categoryContent = data.category;
      const date = new Date(data.date);
      const company = data.company;
      const pictures = data.imageList;
      const itemRecord = data.itemRecord;
      const form: itemRegister = {
        itemTagList,
        categoryContent,
        pictures,
        itemRecord,
        date,
        company,
        order: res.data.order,
      };
      setForm(form);
    }
  };

  const onSubmit: SubmitHandler<itemRegister> = async (data) => {
    if (!portfolioId) return alert("잘못된 접근입니다. - itemCreate");
    const category = data.categoryContent;
    if (!data.itemTagList || data.itemTagList.length === 0) {
      setOpenSnackbar(true);
      setSnackbarMessage(alertMessage.tag);
      return;
    } else if (!data.company || !data.date || !data.itemRecord) {
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
      company: data.company,
      date: dateFormatter(data.date),
      order: data.order,
    };
    if (!isEdit) {
      if (!order) return;
      body.order = parseInt(order);
      setLoadging(true);
      const res = await postItem(body);
      if (res.status === "SUCCESS") {
        setForm();
        setTimeout(() => {
          setLoadging(false);
          navigate(-1);
        }, 1000);
        return;
      }
      console.log("아이템 등록에 실패했습니다.");
    } else {
      const res = await putItem(isEdit, body);
      if (res.status === "SUCCESS") {
        setForm();
        setTimeout(() => {
          setLoadging(false);
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

  return (
    <>
      <div>
        <Header />
      </div>

      <Slide
        className='overflow-y-scroll px-4 flex-1 flex'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='w-full h-full px-4 flex flex-col'>
          {loadging && (
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
                <CustomDatePicker state='date' required />
                <CustomInput content={company} required />
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
