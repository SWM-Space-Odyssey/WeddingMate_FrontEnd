import React from "react";
import CustomText from "../../Modules/CustomText";
import ImageSlider from "./subComponent/ImageSlider";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Slide } from "@mui/material";

type Props = {};

const pictures = [
  "https://images.pexels.com/photos/1317844/pexels-photo-1317844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3643714/pexels-photo-3643714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const tagList = ["비즈", "펜던트", "귀걸이"];

const ItemPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const defaultClassName = "flex flex-col gap-1";

  return (
    <Slide direction='left' in={view === "Item"} mountOnEnter unmountOnExit>
      <div className={`px-4 flex flex-col w-full gap-6`}>
        <div className={defaultClassName}>
          <CustomText type='Title' text='카테고리' />
          <CustomText type='Content' text='반지' />
        </div>
        <div className='max-w-lg'>
          <ImageSlider images={pictures} />
        </div>
        <CustomTagBlock title='태그' spreadValues={tagList} />
        <div className={defaultClassName}>
          <CustomText type='Title' text='상세 설명' />
          <CustomText type='Content' text='안녕하세요' />
        </div>
        <div className={defaultClassName}>
          <CustomText type='Title' text='일정 기록' />
          <CustomText type='Content' text='2021.01.01 ~ 2021.01.01' />
        </div>
      </div>
    </Slide>
  );
};

export default ItemPage;
