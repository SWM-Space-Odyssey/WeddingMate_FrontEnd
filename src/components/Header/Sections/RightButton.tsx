import { Delete, Edit, Settings } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LikeButton from "../../Modules/LikeButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Icon, IconButton } from "@mui/material";
import { deleteItem } from "../../../api/Item";
import { deletePortfolio } from "../../../api/portfolio";
import ReportButton from "../../Modules/ReportButton";
import { deleteContent } from "../../../api/community";

type Props = {};

const RightButton = (props: Props) => {
  const [contentType, setContentType] = useState<"ITEM" | "PORTFOLIO">("ITEM");
  const location = useLocation().pathname.split("/");
  const isLike = useSelector((state: RootState) => state.view.isLike);
  const isWriter = useSelector((state: RootState) => state.view.isWriter);
  const { portfolioId, itemId, order } = useSelector(
    (state: RootState) => state.view.adjData
  );
  const navigate = useNavigate();
  const type = location[1] as "item" | "portfolio" | "mypage" | "planner";
  const contentId = location[2];
  let adjURL: string;
  if (type === "item") {
    adjURL = `/create/item/${portfolioId}/${order}/${itemId}`;
  } else if (type === "portfolio") {
    adjURL = `/create/portfolio/${portfolioId}`;
  } else {
    adjURL = `/community/post/${contentId}`;
  }
  const deleteHandler = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    if (type === "item") {
      const { status, data } = await deleteItem(itemId);
      if (status === "SUCCESS") {
        navigate(-1);
      } else {
        alert("삭제에 실패했습니다. - PortfolioHeader");
      }
    } else if (type === "portfolio") {
      const response = await deletePortfolio(portfolioId);
      if (response.data.status === "SUCCESS") {
        navigate("/plannerMypage");
      } else {
        alert("삭제에 실패했습니다. - PortfolioHeader");
      }
    } else {
      const { status, data } = await deleteContent(parseInt(contentId));
      console.log(status, data);
      if (status === "SUCCESS") {
        navigate("/community");
      } else {
        alert("삭제에 실패했습니다. - CommunityHeader");
      }
    }
  };
  const WriterButtonSet = () => {
    return (
      <div>
        <IconButton
          onClick={() => {
            navigate(adjURL);
          }}
        >
          <Edit fontSize='small' />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteHandler();
          }}
        >
          <Delete fontSize='small' />
        </IconButton>
      </div>
    );
  };
  const MyPageSetting = () => {
    return (
      <IconButton
        onClick={() => {
          navigate("/mypage/setting");
        }}
      >
        <Settings fontSize='small' />
      </IconButton>
    );
  };

  const LikeButtonSet = () => {
    const integerId = parseInt(contentId);
    const reportBody: {
      reportedItemId: number;
      reportItemType: "PORTFOLIO" | "ITEM" | "USER" | null;
    } = {
      reportedItemId: integerId,
      reportItemType: null,
    };
    if (type === "item") {
      reportBody.reportItemType = "ITEM";
      return (
        <>
          <ReportButton body={reportBody} />
          <LikeButton targetId={integerId} isLiked={isLike} type={type} />
        </>
      );
    } else if (type === "portfolio") {
      reportBody.reportItemType = "PORTFOLIO";
      return (
        <>
          <ReportButton body={reportBody} />
          <LikeButton targetId={integerId} isLiked={isLike} type={type} />;
        </>
      );
    } else if (type === "planner") {
      reportBody.reportItemType = "USER";
      return (
        <>
          <LikeButton targetId={integerId} isLiked={isLike} type={type} />;
          <ReportButton body={reportBody} />
        </>
      );
    }
  };

  if (isWriter && ["item", "portfolio", "community"].includes(type)) {
    return <WriterButtonSet />;
  } else if (!isWriter && ["item", "portfolio"].includes(type)) {
    return <LikeButtonSet />;
  } else if (type === "mypage") {
    if (location.length > 2) {
      return <div className='w-10' />;
    }
    return <MyPageSetting />;
  } else {
    return <div className='w-10' />;
  }
};

export default RightButton;
