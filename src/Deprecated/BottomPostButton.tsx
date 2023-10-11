import { EditNote } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

// 더 이상 사용되지 않는 Component
// From /PlannerPage/subComponent/PlannerPortfolio.tsx
const BottomPostButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <IconButton
      color='primary'
      sx={{
        borderColor: "primary",
        border: "2px solid",
        p: 0.5,
        bgcolor: "white",
      }}
      onClick={() => {
        navigate("/create/portfolio");
      }}
    >
      <div className='flex flex-col items-center p-1 aspect-square justify-center'>
        <EditNote sx={{ ml: 0.5 }} />
        <div className='text-xs'>포폴 추가</div>
      </div>
    </IconButton>
  );
};

export default BottomPostButton;
