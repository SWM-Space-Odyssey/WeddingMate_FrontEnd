import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { postLike } from "../../api/like";

type Props = {
  isLiked: boolean | null;
  targetId: number;
  type: "portfolio" | "item" | "planner" | "company";
};

const LikeButton = (props: Props) => {
  const [like, setLike] = React.useState(props.isLiked ?? false);
  const onClickLike = () => {
    setLike(!like);
    const body = {
      id: `${props.targetId}`,
      likeType: props.type,
    };
    const response = postLike(body as any);
  };

  return (
    <IconButton size='small' onClick={() => onClickLike()}>
      {like ? <Favorite color='primary' /> : <FavoriteBorder color='primary' />}
    </IconButton>
  );
};

export default LikeButton;
