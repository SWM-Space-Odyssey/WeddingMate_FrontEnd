import { Delete } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React from "react";

type Props = {
  body: {
    writer: string;
    message: string;
    contact: string;
  };
};

// 더이상 사용되지 않는 Component
// From /PlannerPage/subComponent/ContactCard.tsx
const ContactCard = (props: Props) => {
  const { writer, message, contact } = props.body;
  return (
    <Paper sx={{ p: 2 }}>
      <div className='flex '>
        <div className='flex-1 text-sm'>{writer} 님의 메세지</div>
        <Delete />
      </div>
      <div className='text-lg py-1'>{message}</div>
      <div className='text-xs font-bold'>{contact}</div>
    </Paper>
  );
};

export default ContactCard;
