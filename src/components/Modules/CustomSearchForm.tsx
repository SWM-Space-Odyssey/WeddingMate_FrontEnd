import { Search } from "@mui/icons-material";
import { Collapse, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {};

type SearchKeyword = {
  search: string;
};
const CustomSearchForm = (props: Props) => {
  const [focus, setFocus] = useState(true);
  const focusRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit } = useForm<SearchKeyword>();
  const { ref, ...rest } = register("search");
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SearchKeyword> = (data) => {
    navigate("/search/" + data.search);
  };
  return (
    <div
      className='h-10 py-2.5 px-2 mb-4 bg-[#F5F5F5] rounded-sm cursor-text'
      onClick={() => {
        if (focusRef.current) {
          focusRef.current.focus();
        }
      }}
    >
      <Collapse in={focus}>
        <div className='flex w-full items-center gap-1 h-5'>
          <Search fontSize='small' sx={{ color: "#ACACAC" }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className='outline-none text-sm flex-1 bg-[#F5F5F5] text-[#000000]'
              {...rest}
              name='search'
              ref={(e) => {
                ref(e);
                focusRef.current = e;
              }}
              placeholder='검색어를 입력해 주세요'
            />
          </form>
        </div>
      </Collapse>
    </div>
  );
};

export default CustomSearchForm;
