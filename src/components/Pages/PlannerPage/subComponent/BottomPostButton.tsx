import { EditNote } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const BottomPostButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <IconButton
      color='primary'
      sx={{ borderColor: "primary", border: "2px solid" }}
      onClick={() => {
        navigate("/create/portfolio");
      }}
    >
      <div className='flex flex-col items-center p-1'>
        <EditNote sx={{ ml: 0.5 }} />
        <div className='text-xs'>포폴 추가</div>
      </div>
    </IconButton>
  );
};

export default BottomPostButton;
