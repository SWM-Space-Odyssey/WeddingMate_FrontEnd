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

type Props = {};
interface PortfolioInputContentType {
  state: "Title";
  title: string;
  placeholder: string;
}

const PortfolioCreate = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const methods = useForm<portfolioRegister>();
  const [initMood, setInitMood] = useState<string[]>([]);
  const [initLocation, setInitLocation] = useState<string[]>([]);
  4;
  // const { data } = useQuery(["getMenu"], () => getItem("portfolio", 1));

  const useResetForm = (data: portfolioRegister) => {
    methods.reset(data);
    setInitMood(data.Mood);
    setInitLocation(data.Location);
  };
  const getData = async () => {
    const resData = await getItem("portfolio", 1);
    if (resData) {
      const resMood: string[] = [];
      const resLocation: string[] = [];
      resData.tagResDtoList.forEach((tag) => {
        if (CountryList.includes(tag.content)) {
          resLocation.push(tag.content);
        } else if (!initMood.includes(tag.content)) {
          resMood.push(tag.content);
        }
      });
      const FormData = {
        Title: resData.title,
        Mood: [...resMood],
        Location: [...resLocation],
        pictures: [resData.repImgUrl],
      };
      useResetForm(FormData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit: SubmitHandler<portfolioRegister> = (data) => {
    const body = new FormData();
    for (let i = 0; i < data.pictures.length; i++) {
      body.append("file", data.pictures[i]);
    }
    const jsonData = {
      title: data.Title,
      tags: data.Mood.concat(data.Location),
    };
    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });
    body.append("portfolioSaveReqDto", blob);
    console.log("DATA POST ! : ", data);
    // 위 콘솔을 주석처리하고 아래 코드를 주석을 풀면 실제로 서버에 데이터가 전송됩니다
    // const postData = postItem({ itemType: "portfolio", body });
  };

  const InputContent: PortfolioInputContentType = {
    state: "Title",
    title: "타이틀",
    placeholder: "제목을 입력해 주세요",
  };

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
            <ImageUpload title='image' maxCount={5} />
            <Button
              type='submit'
              sx={{ fontSize: "1rem", bottom: 0 }}
              className='w-full'
              variant='contained'
            >
              추가
            </Button>
            <Button
              type='button'
              onClick={() => console.log(initMood, initLocation)}
            >
              TEST
            </Button>
          </form>
        </FormProvider>
      </div>
    </Slide>
  );
};

export default PortfolioCreate;
