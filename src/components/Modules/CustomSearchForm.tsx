import { Search } from "@mui/icons-material";
import { Collapse, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const CustomSearchForm = (props: Props) => {
  const [focus, setFocus] = useState(true);
  return (
    <div className='w-full flex py-2.5 px-2 gap-1 bg-[#F5F5F5] rounded-sm'>
      <Collapse in={focus}>
        <Search sx={{ color: "#ACACAC" }} />
        <input
          className='outline-none text-sm flex-1 bg-[#F5F5F5] text-[#ACACAC]'
          placeholder='검색어를 입력해 주세요'
        />
      </Collapse>
    </div>
  );
};

export default CustomSearchForm;
