import React, { useEffect, useState } from "react";
import CustomInput from "../../Modules/CustumInput";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { MoodTagList } from "../../../common/TagList";
import { CountryList } from "../../../common/CountryLIst";
import { Button, Slide } from "@mui/material";
import ImageUpload from "../../Modules/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import axios from "axios";
import { getItem } from "../../../api/Item";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../Header/Header";
import { useParams } from "react-router-dom";
import {
  getPortfolio,
  postPortfolio,
  putPortfolio,
} from "../../../api/portfolio";
import { MY_ACCESS_KEY, SERVER_URL } from "../../../common/constants";

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

type portfolioData = {
  typeTag: "portfolio";
  status: "SUCCESS" | "FAIL";
  data: {
    id: string;
    title: string;
    itemResDtoList: Object[];
    repImgUrl: string;
    tagResDtoList: tagResDtoList[];
  };
};

type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};

const PortfolioCreate = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const methods = useForm<portfolioRegister>();
  const [isEdit, setIsEdit] = useState<null | number>(null);
  const [initMood, setInitMood] = useState<string[]>([]);
  const [initLocation, setInitLocation] = useState<string[]>([]);
  4;
  const param = useParams().portfolioId;
  const setForm = (data?: portfolioRegister) => {
    if (data) {
      methods.reset(data);
      setInitMood(data.Mood);
      setInitLocation(data.Location);
    } else {
      methods.reset();
      setInitMood([]);
      setInitLocation([]);
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
      const resMood: string[] = [];
      const resLocation: string[] = [];
      response.tagResDtoList.forEach((tag) => {
        if (CountryList.includes(tag.content)) {
          resLocation.push(tag.content);
        } else if (!initMood.includes(tag.content)) {
          resMood.push(tag.content);
        }
      });
      const FormData = {
        Title: response.title,
        Mood: [...resMood],
        Location: [...resLocation],
        pictures: [response.repImgUrl],
      };
      setForm(FormData);
    }
  };

  const onSubmit: SubmitHandler<portfolioRegister> = async (data) => {
    const body = new FormData();
    const jsonData = {
      title: data.Title,
      tags: data.Mood.concat(data.Location),
    };
    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });
    body.append("file", data.pictures[0]);
    body.append("portfolioSaveReqDto", blob);
    console.log(data);
    if (isEdit) {
      const putData = await putPortfolio({
        itemType: "portfolio",
        body,
        itemId: isEdit,
      });
      if (putData.status === "SUCCESS") return setForm();
      console.log("포트폴리오 수정에 실패했습니다.");
    } else {
      const postData = await postPortfolio({ itemType: "portfolio", body });
      if (postData.status === "SUCCESS") return setForm();
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
    <Slide direction='left' in mountOnEnter unmountOnExit>
      <div className='absolute h-full px-4'>
        <Header />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex flex-col gap-6 h-full '
          >
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
              initValue={initLocation}
            />
            <ImageUpload title='image' maxCount={1} />
            <Button
              type='submit'
              sx={{ fontSize: "1rem", bottom: 0 }}
              className='w-full'
              variant='contained'
            >
              추가
            </Button>
          </form>
        </FormProvider>
      </div>
    </Slide>
  );
};

export default PortfolioCreate;
