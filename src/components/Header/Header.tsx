import { Box, Button, Grid, Typography, colors } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { logo } from "../../assets/logo";
import { arrow_back } from "../../assets/arrow_back";
import LeftButton from "./Sections/LeftButton";
import { tokenRefresh } from "../../api/user";
import RightButton from "./Sections/RightButton";
import CenterContent from "./Sections/CenterContent";

type Props = {
  main?: "main" | "regist";
  rightButton?: JSX.Element;
};

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const view = useSelector((state: RootState) => state.view.viewStack);
  const page = useSelector((state: RootState) => state.view.page);

  const location = useLocation().pathname.split("/")[1];

  // const leftButton = () => {
  //   return (
  //     <button
  //       type='button'
  //       onClick={() => {
  //         navigate(-1);
  //       }}
  //     >
  //       <div>{arrow_back}</div>
  //       {/* <ArrowBackIos color='secondary' /> */}
  //     </button>
  //   );
  // };
  // const centerContent = () => {
  //   const type = useSelector((state: RootState) => state.user.type);
  //   const maxPage = type === "planner" ? 3 : 4;
  //   if (props.main === "regist") {
  //     return (
  //       <>
  //         {page < maxPage && (
  //           <Typography color={"secondary"}>
  //             회원가입 ({page + 1}/{maxPage})
  //           </Typography>
  //         )}
  //       </>
  //     );
  //   } else {
  //     return logo;
  //   }
  // };

  return (
    <div
      className={`sticky h-14 py-1.5 px-2 justify-center ${
        location === "search" ? "hidden" : ""
      }`}
    >
      <div className='h-10 items-center flex'>
        <div className='flex justify-center'>
          <LeftButton />
        </div>
        <div className='flex flex-1'>
          <CenterContent />
        </div>
        <div className='flex justify-center'>
          <RightButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
