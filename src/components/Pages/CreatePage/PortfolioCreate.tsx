import React, { useEffect, useState } from "react";
import CustomInput from "../../Modules/CustumInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { MoodTagList } from "../../../common/TagList";
import { CountryList } from "../../../common/CountryLIst";
import { Button, Slide } from "@mui/material";
import ImageUpload from "../../Modules/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import axios from "axios";
import { getItem, postItem } from "../../../api/Item";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../Header/Header";
import { useParams } from "react-router-dom";

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

const PortfolioCreate = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const methods = useForm<portfolioRegister>();
  const [initMood, setInitMood] = useState<string[]>([]);
  const [initLocation, setInitLocation] = useState<string[]>([]);
  4;
  const param = useParams().itemId;
  const useResetForm = (data?: portfolioRegister) => {
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

  const getData = async (itemId: number) => {
    const resData = await getItem("portfolio", 1);
    if (resData?.status === "SUCCESS" && resData.data) {
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
      useResetForm(FormData);
    }
  };

  const onSubmit: SubmitHandler<portfolioRegister> = async (data) => {
    const body = new FormData();
    body.append("file", data.pictures[0]);
    const jsonData = {
      title: data.Title,
      tags: data.Mood.concat(data.Location),
    };
    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });
    body.append("portfolioSaveReqDto", blob);
    const postData = await postItem({ itemType: "portfolio", body });
    console.log(postData);
    if (postData.status === 201) useResetForm();
  };

  useEffect(() => {
    if (param) {
      const isValidParam = parseInt(param);
      if (isValidParam) {
        console.log("valid param");
        getData(isValidParam);
      } else {
        console.log("invalid param");
      }
    }
  }, [param]);
  return (
    <Slide
      direction='left'
      in={view === "PortfolioCreate"}
      mountOnEnter
      unmountOnExit
    >
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
