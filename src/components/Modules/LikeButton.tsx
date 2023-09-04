import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { postLike } from "../../api/like";

type Props = {
  isLiked: boolean | null;
  targetId: number;
  type: "PORTFOLIO" | "ITEM" | "PLANNER";
};

const LikeButton = (props: Props) => {
  const [like, setLike] = React.useState(props.isLiked ?? false);
  console.log(props);
  const onClickLike = () => {
    setLike(!like);
    const body = {
      id: `${props.targetId}`,
      likeType: props.type,
    };
    const response = postLike(body);
    console.log(response);
  };

  return (
    <IconButton size='small' onClick={() => onClickLike()}>
      {like ? <Favorite color='primary' /> : <FavoriteBorder color='primary' />}
    </IconButton>
  );
};

export default LikeButton;
