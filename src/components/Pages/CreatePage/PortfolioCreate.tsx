import React, { useEffect, useState } from "react";
import CustomInput from "../../Modules/CustomInput";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { MoodTagList } from "../../../common/TagList";
import { CountryList } from "../../../common/CountryLIst";
import { Button, Slide } from "@mui/material";
import ImageUploader from "../../Modules/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import axios from "axios";
import { getItem } from "../../../api/Item";
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
  const view = useSelector((state: RootState) => state.view.currentView);
  const methods = useForm<portfolioRegister>();
  const [isEdit, setIsEdit] = useState<null | number>(null);
  const [initMood, setInitMood] = useState<string[]>([]);
  const [initRegion, setInitRegion] = useState<string>("");
  const [itemOrderList, setItemOrderList] = useState<ItemOrderList[]>([]);
  const param = useParams().portfolioId;
  const navigate = useNavigate();
  const setForm = (data?: portfolioRegister) => {
    if (data) {
      methods.reset(data);
      setInitMood(data.Mood);
      setInitRegion(data.region);
    } else {
      console.log("mothods Reset");
      methods.reset();
      setInitMood([]);
      setInitRegion("");
    }
  };

  const getInitData = async (itemId: number) => {
    setIsEdit(itemId);
    // const resData = await getPortfolio(itemId);
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

    console.log(resData);
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
    const joinString = data.Mood.join(",");
    const jsonData: JsonData = {
      title: data.Title,
      tags: joinString,
      region: data.region,
    };
    if (isEdit) {
      jsonData.itemOrderList = itemOrderList;
    }
    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });

    body.append("file", data.pictures[0]);
    if (isEdit) {
      body.append("portfolioUpdateReqDto", blob);
      console.log(body.getAll("file"));
      const editData = await editPortfolio({
        itemType: "portfolio",
        body,
        itemId: isEdit,
      });
      if (editData.status === "SUCCESS") return setForm();
      console.log("포트폴리오 수정에 실패했습니다.");
    } else {
      body.append("portfolioSaveReqDto", blob);
      const postData = await postPortfolio({ itemType: "portfolio", body });
      if (postData.status === "SUCCESS") {
        setForm();
        navigate("/plannermypage");
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
      <div>
        <Header />
      </div>
      <Slide direction='left' in mountOnEnter unmountOnExit>
        <div className='h-full px-4 flex flex-col'>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-6 flex-1 justify-between mt'
            >
              <div className='flex flex-col gap-6 pt-6'>
                <CustomInput content={InputContent} />
                <CustomTagBlock
                  title='MOOD'
                  renderCounter={true}
                  spreadValues={MoodTagList}
                  formState='Mood'
                  maxTag={3}
                  initValue={initMood}
                />
                <CustomTagBlock
                  title='Location'
                  spreadValues={CountryList}
                  formState='Location'
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
        </div>
      </Slide>
    </>
  );
};

export default PortfolioCreate;
