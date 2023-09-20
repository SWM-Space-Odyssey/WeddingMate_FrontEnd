import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../../Modules/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import "./index.pcss";
import { ArrowBack, Cancel, Search } from "@mui/icons-material";
import MasonryImage from "../../Modules/MasonryImage";
import SearchFeed from "./subComponent/SearchFeed";
import SearchPlanner from "./subComponent/SearchPlanner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type SearchKeyword = {
  search: string;
};
type Props = {};
const boxFocus = {
  boxShadow: "0 0 0 1px #D9D9D9 inset",
  borderRadius: "2px",
};

const SearchPage = (props: Props) => {
  const param = useParams();
  const methods = useForm<SearchKeyword>({
    defaultValues: {
      search: param.search ? param.search : "",
    },
  });
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const onSubmit: SubmitHandler<SearchKeyword> = (data) => {
    const { search } = data;
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    if (param.search) {
      setSearch(param.search);
    }
  }, [param]);

  return (
    <div className='flex flex-col'>
      <div className='flex  items-center gap-1.5 px-1.5 py-2'>
        <button className='p-2 w-10 h-10 flex' onClick={() => navigate(-1)}>
          <ArrowBack className='w-6 h-6' />
        </button>
        <Box
          className='flex items-center h-10 flex-1 gap-1 py-2.5 px-3 mr-2.5'
          sx={boxFocus}
        >
          <Search sx={{ color: "#999999" }} />
          <form
            className='flex-1'
            onSubmit={methods.handleSubmit(onSubmit as any)}
            acceptCharset='utf-8'
          >
            <input
              className='outline-none text-sm w-full'
              {...methods.register("search")}
              autoComplete='off'
            />
          </form>
          <button>
            <Cancel
              fontSize='small'
              sx={{
                color: "#E1E1E1",
                bgcolor: "#ACACAC",
                borderRadius: "100%",
              }}
            />
          </button>
        </Box>
      </div>
      <SearchPlanner search={search} />
      <SearchFeed search={search} />
    </div>
  );
};

export default SearchPage;
