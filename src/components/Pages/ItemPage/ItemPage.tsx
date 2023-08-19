import React, { Suspense } from "react";
import CustomText from "../../Modules/CustomText";
import ImageSlider from "./subComponent/ImageSlider";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Slide } from "@mui/material";
import Header from "../../Header/Header";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem, getItem } from "../../../api/Item";
import HeaderOptionButton from "../../Modules/HeaderOptionButton";
import { Delete, Edit } from "@mui/icons-material";

type Props = {};

const pictures = [
  "https://images.pexels.com/photos/1317844/pexels-photo-1317844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3643714/pexels-photo-3643714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const tagList = ["비즈", "펜던트", "귀걸이"];
const defaultClassName = "flex flex-col gap-1";

const ItemPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const viewId = useSelector((state: RootState) => state.view.requestParam);
  const navigate = useNavigate();
  if (viewId) {
  }
  const itemId = useParams().itemId;
  if (!itemId) {
    navigate("/");
    return;
  }
  const { data, isLoading } = useQuery(
    ["item", itemId],
    () => getItem("item", parseInt(itemId)),
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteHandler = async () => {
    if (!portfolioId) return;
    const { status, data } = await deleteItem(parseInt(itemId));
    if (status === "SUCCESS") {
      navigate(-1);
    } else {
      alert("삭제에 실패했습니다. - PortfolioHeader");
    }
  };

  const {
    category,
    company,
    date,
    imageList,
    itemRecord,
    itemTagList,
    order,
    portfolioId,
    isWriter,
  } = data?.data as ItemBody;

  const menuItems = [
    {
      content: (
        <>
          <Edit />
          아이템 수정하기
        </>
      ),
      onClick: () => {
        navigate(`/create/item/${portfolioId}/${order}/${itemId}`);
      },
    },
    {
      content: (
        <>
          <Delete />
          아이템 삭제하기
        </>
      ),
      onClick: () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
          deleteHandler();
        }
      },
    },
  ];

  return (
    <>
      <div>
        <Header />
      </div>
      <Slide
        className='overflow-y-scroll px-4 pt-6 gap-6 flex flex-col'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className={`px-4 h-fit flex flex-col w-full gap-6 `}>
          {isLoading && <div>로딩중</div>}
          {data && (
            <>
              <div className='flex justify-between'>
                <div className={defaultClassName}>
                  <CustomText type='Title' text='카테고리' />
                  <CustomText type='Content' text={category} />
                </div>
                {isWriter && <HeaderOptionButton data={{ menuItems }} />}
              </div>
              <div className='max-w-lg'>
                <ImageSlider images={imageList} />
              </div>
              <CustomTagBlock
                title='태그'
                spreadValues={itemTagList.split(",")}
                type='item'
              />
              <div className={defaultClassName}>
                <CustomText type='Title' text='상세 설명' />
                <CustomText type='Content' text={itemRecord} />
              </div>
              <div className={defaultClassName}>
                <CustomText type='Title' text='일정 기록' />
                <CustomText type='Content' text={date} />
              </div>
              <div className={defaultClassName}>
                <CustomText type='Title' text='업체명' />
                <CustomText type='Content' text={company} />
              </div>
            </>
          )}
        </div>
      </Slide>
    </>
  );
};

export default ItemPage;
