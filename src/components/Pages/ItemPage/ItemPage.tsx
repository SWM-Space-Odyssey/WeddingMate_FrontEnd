import React, { Suspense, useEffect } from "react";
import CustomText from "../../Modules/CustomText";
import ImageSlider from "./subComponent/ImageSlider";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Slide } from "@mui/material";
import Header from "../../Header/Header";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem, fetchItems } from "../../../api/Item";
import HeaderOptionButton from "../../Modules/HeaderOptionButton";
import { Delete, Edit } from "@mui/icons-material";
import InfoIndicator from "../../Modules/InfoIndicator";
import { useDispatch } from "react-redux";
import { setAdjData, setIsLike, setIsWriter } from "../../../store/viewSlice";

type Props = {};

const defaultClassName = "flex flex-col gap-1";

const ItemPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const viewId = useSelector((state: RootState) => state.view.requestParam);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (viewId) {
  }
  const itemId = useParams().itemId;
  if (!itemId) {
    navigate("/");
    return;
  }
  const { data, isLoading } = useQuery(
    ["item", itemId],
    () => fetchItems(parseInt(itemId)),
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data?.data) {
      const { isWriter } = data?.data as ItemBody;
      dispatch(setIsWriter(isWriter as boolean));
      const adjData = {
        portfolioId: data.data.portfolioId,
        itemId: data.data.itemId,
        order: data.data.order,
      };
      dispatch(setAdjData(adjData));
      dispatch(setIsLike(data.data.isLiked));
    }
  }, [data, itemId]);

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
    companyName,
    date,
    imageList,
    itemRecord,
    itemTagList,
    order,
    portfolioId,
    isWriter,
  } = data?.data as ItemBody;

  return (
    <>
      {/* <div>
        <Header />
      </div> */}
      <InfoIndicator portfolioId={`${portfolioId}`} type='item' />
      <Slide
        className='px-4 pt-6 pb-10 gap-6 flex flex-col  overflow-y-scroll'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className={`px-4 h-fit flex flex-col w-full gap-6 `}>
          {isLoading && <div>로딩중</div>}
          {data && (
            <>
              <div className='flex flex-col'>
                <div className='flex justify-between'>
                  <div className={defaultClassName}>
                    <CustomText type='Title' text='카테고리' />
                    <CustomText type='Content' text={category} />
                  </div>
                </div>
              </div>
              <div className='max-w-lg'>
                <ImageSlider images={imageList} />
              </div>
              <CustomTagBlock
                title='태그'
                spreadValues={itemTagList?.split(",")}
                type='item'
              />
              <div className={defaultClassName}>
                <CustomText type='Title' text='상세 설명' />
                <CustomText type='Content' text={itemRecord} />
              </div>
              {date && (
                <div className={defaultClassName}>
                  <CustomText type='Title' text='일정 기록' />
                  <CustomText type='Content' text={date} />
                </div>
              )}
              {companyName && (
                <div className={defaultClassName}>
                  <CustomText type='Title' text='업체명' />
                  <CustomText type='Content' text={companyName} />
                </div>
              )}
            </>
          )}
        </div>
      </Slide>
    </>
  );
};

export default ItemPage;
