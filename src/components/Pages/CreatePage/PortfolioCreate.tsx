import React, { useEffect, useState } from "react";
import CustomInput from "../../Modules/Custom/CustomInput";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import CustomTagBlock from "../../Modules/Custom/CustomTagBlock";
import { MoodTagList } from "../../../common/TagList";
import { CountryList } from "../../../common/CountryLIst";
import { Alert, Button, Slide, Snackbar } from "@mui/material";
import ImageUploader from "../../Modules/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import * as amplitude from "@amplitude/analytics-browser";
import axios from "axios";
import { fetchItems } from "../../../api/Item";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPortfolio,
  postPortfolio,
  editPortfolio,
} from "../../../api/portfolio";
// import { MY_ACCESS_KEY, SERVER_URL } from "../../../common/constants";
import { SERVER_URL } from "../../../common/constants";
import LoadingSpinner from "../../Modules/LoadingSpinner";
import { useDispatch } from "react-redux";
import { setGuide } from "../../../store/userSlice";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type Props = {};
interface PortfolioInputContentType {
  state: "Title";
  title: string;
  placeholder: string;
}

const InputContent: PortfolioInputContentType = {
  state: "Title",
  title: "타이틀",
  placeholder: "제목을 입력해 주세요",
};
type ItemOrderList = { itemId: number; itemOrder: number };

type ItemResDtoList = {
  itemId: number;
  order: number;
  itemTagList: string;
  itemRecord: string;
  portfolioId: number;
  imageList: string[];
  date: string;
  company: string;
  category: string;
  isWriter: boolean;
};

type portfolioData = {
  typeTag: "portfolio";
  status: "SUCCESS" | "FAIL";
  data: {
    id: string;
    title: string;
    itemResDtoList: ItemResDtoList[];
    repImgUrl: string;
    tagList: string;
    region: string;
  };
};
type JsonData = {
  title: string;
  tags: string;
  region: string;
  itemOrderList?: ItemOrderList[];
};
const PortfolioCreate = (props: Props) => {
  const guide = useSelector((state: RootState) => state.user.guide);
  const methods = useForm<portfolioRegister>();

  const [isEdit, setIsEdit] = useState<null | number>(null);
  const [initMood, setInitMood] = useState<string[]>([]);
  const [initRegion, setInitRegion] = useState<string>("");
  const [itemOrderList, setItemOrderList] = useState<ItemOrderList[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const param = useParams().portfolioId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const snackbarOpenFunc = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const snackbarClose = () => {
    setSnackbarOpen(false);
  };

  const setForm = (data?: portfolioRegister) => {
    if (data) {
      methods.reset(data);
      setInitMood(data.Mood);
      setInitRegion(data.region);
    } else {
      methods.reset();
      setInitMood([]);
      setInitRegion("");
    }
  };

  const getInitData = async (itemId: number) => {
    setIsEdit(itemId);
    const resData = await axios
      .get(`${SERVER_URL}/api/v1/portfolio/${itemId}`, {
        headers: { Authorization: `Bearer ${MY_ACCESS_KEY}` },
      })
      .then((res) => {
        return {
          typeTag: "portfolio",
          ...res.data,
        } as portfolioData;
      });

    if (resData?.status === "SUCCESS" && resData.typeTag === "portfolio") {
      const response = resData.data;
      const resMood = response.tagList.split(",");
      const resItemResDtoList: ItemOrderList[] = [];
      response.itemResDtoList.forEach((item, index) => {
        resItemResDtoList.push({ itemId: item.itemId, itemOrder: index });
      });
      const resRegion = response.region;
      setItemOrderList(resItemResDtoList);
      const FormData = {
        Title: response.title,
        Mood: resMood,
        region: resRegion,
        pictures: [response.repImgUrl],
      };
      setForm(FormData);
    }
  };

  const onSubmit: SubmitHandler<portfolioRegister> = async (data) => {
    const body = new FormData();
    if (!data.Mood) {
      snackbarOpenFunc("분위기");
      return;
    }
    if (!data.region) {
      snackbarOpenFunc("지역");
      return;
    }
    const joinString = data.Mood.join(",");
    const jsonData: JsonData = {
      title: data.Title,
      tags: joinString,
      region: typeof data.region === "string" ? data.region : data.region[0],
    };

    if (isEdit && itemOrderList.length > 0) {
      jsonData.itemOrderList = itemOrderList;
    }
    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });
    body.append("file", data.pictures[0]);
    if (isEdit) {
      body.append("portfolioUpdateReqDto", blob);
      const editData = await editPortfolio({
        itemType: "portfolio",
        body,
        itemId: isEdit,
      });
      if (editData.status === "SUCCESS") {
        setLoading(true);
        setForm();
        setTimeout(() => {
          setLoading(false);
          navigate(-1);
        }, 1000);
        return;
      }
      console.log("포트폴리오 수정에 실패했습니다.");
    } else {
      body.append("portfolioSaveReqDto", blob);
      const postData = await postPortfolio({ itemType: "portfolio", body });
      if (postData.status === "SUCCESS") {
        if (!guide.portfolio) {
          dispatch(setGuide("portfolio"));
          amplitude.track("OpenEvent-portfolio");
        }
        setLoading(true);
        setForm();
        setTimeout(() => {
          setLoading(false);
          navigate("/plannermypage");
        }, 1000);
        return;
      }
      console.log("포트폴리오 등록에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!param) return;
    const isValidParam = parseInt(param);
    if (!isValidParam) return;
    getInitData(isValidParam);
  }, [param]);
  return (
    <>
      {/* <div>
        <Header />
      </div> */}
      <Slide
        className='overflow-y-scroll px-4 flex-1 flex'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='h-full px-4 flex flex-col'>
          {loading && (
            <div className='absolute backdrop-blur-sm w-full h-full z-50'>
              <LoadingSpinner />
            </div>
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-6 flex-1 justify-between mt'
            >
              <div className='flex flex-col gap-6 pt-6'>
                <CustomInput content={InputContent} />
                <CustomTagBlock
                  title='분위기'
                  subtitle='작성하시는 글에 맞는 분위기를 선택해주세요'
                  renderCounter={true}
                  spreadValues={MoodTagList}
                  formState='Mood'
                  maxTag={3}
                  initValue={initMood}
                />
                <CustomTagBlock
                  title='지역'
                  subtitle='대략적인 지역을 입력해주세요'
                  spreadValues={CountryList}
                  formState='region'
                  initValue={[initRegion]}
                />
                <ImageUploader title='image' maxCount={1} />
              </div>
              <Button
                type='submit'
                sx={{ fontSize: "1rem", my: 1, color: "white" }}
                className='w-full'
                variant='contained'
              >
                추가
              </Button>
            </form>
          </FormProvider>
          <Snackbar
            open={snackbarOpen}
            onClose={snackbarClose}
            autoHideDuration={1500}
          >
            <Alert severity='error'>
              {snackbarMessage} 태그를 최소 한 개 이상 선택해주세요 !
            </Alert>
          </Snackbar>
        </div>
      </Slide>
    </>
  );
};

export default PortfolioCreate;
