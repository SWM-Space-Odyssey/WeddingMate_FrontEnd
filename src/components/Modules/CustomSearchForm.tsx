import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React from "react";

type Props = {};

const CustomSearchForm = (props: Props) => {
  return (
    <div className='w-full flex py-2 gap-1'>
      <TextField
        className='flex-1'
        placeholder='Search'
        InputProps={{
          startAdornment: <Search />,
        }}
      />
    </div>
  );
};

export default CustomSearchForm;
