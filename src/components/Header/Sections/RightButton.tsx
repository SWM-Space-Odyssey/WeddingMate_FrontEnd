import { Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LikeButton from "../../Modules/LikeButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Icon, IconButton } from "@mui/material";
import { deleteItem } from "../../../api/Item";
import { deletePortfolio } from "../../../api/portfolio";

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
  const type = location[1] as "item" | "portfolio";
  let adjURL: string;
  if (type === "item") {
    adjURL = `/create/item/${portfolioId}/${order}/${itemId}`;
  } else {
    adjURL = `/create/portfolio/${portfolioId}`;
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
    } else {
      const response = await deletePortfolio(portfolioId);
      if (response.data.status === "SUCCESS") {
        navigate("/plannerMypage");
      } else {
        alert("삭제에 실패했습니다. - PortfolioHeader");
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
  const LikeButtonSet = () => {
    if (type === "item") {
      return <LikeButton targetId={itemId} isLiked={isLike} type={type} />;
    } else {
      return <LikeButton targetId={portfolioId} isLiked={isLike} type={type} />;
    }
  };

  {
    /* <LikeButton targetId={1} isLiked={isLike} type={type} /> */
  }
  return (
    <div>
      {isWriter && ["item", "portfolio"].includes(type) && <WriterButtonSet />}
      {!isWriter && ["item", "portfolio"].includes(type) && <LikeButtonSet />}
    </div>
  );
};

export default RightButton;
