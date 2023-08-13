import { BottomNavigation, Box, Button } from "@mui/material";
import Header from "../Header/Header";
import RegistComponent from "./RegistPage/RegistPage";
import PortfolioCreate from "./CreatePage/PortfolioCreate";
import PortfolioPage from "./PortfolioPage/PortfolioPage";
import ItemPage from "./ItemPage/ItemPage";
import ItemCreate from "./CreatePage/ItemCreate";
import { useDispatch } from "react-redux";
import { intoView } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlannerPage from "./PlannerPage/PlannerPage";
import FeedPage from "./FeedPage/FeedPage";
import { useEffect } from "react";
import { tokenRefresh, userCheck } from "../../api/user";
import { useQuery } from "@tanstack/react-query";

type Props = {};
const KAKAO_LOGIN_URL =
  "https://api.weddingmate.co.kr/oauth2/authorization/kakao";

const MainPage = (props: Props) => {
  const navigate = useNavigate();
  // const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const checkData = useQuery(["test"], () => userCheck(accessToken), {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
    });
    const refreshData = useQuery(["refresh"], () => tokenRefresh(accessToken), {
      enabled: checkData.data?.status === 401,
      refetchOnWindowFocus: false,
    });
    if (checkData.data?.status !== 200) {
      if (refreshData.data?.status === 200) {
        localStorage.setItem("accessToken", refreshData.data.accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
  } else {
    console.log("no token");
  }

  return (
    <div className='flex-1 relative flex overflow-y-scroll pt-12'>
      <RegistComponent />
      <ItemPage />
      <div className={`flex flex-col gap-4`}>
        <Button variant='contained' onClick={() => {}}>
          RegistPage
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigate("/create/portfolio/3");
          }}
        >
          PortfolioCreatePage
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigate("/portfolio/3");
          }}
        >
          PortfolioPage
        </Button>
        <Button variant='contained' onClick={() => {}}>
          ItemPage
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigate("/create/item/3");
          }}
        >
          ItemCreatePage
        </Button>
        <Button variant='contained' onClick={() => {}}>
          PlannerPage
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigate("/feed");
          }}
        >
          FeedPage
        </Button>
        <Button href={KAKAO_LOGIN_URL}>LoginButton</Button>
        <Button
          onClick={() => {
            // tokenRefresh();
          }}
        >
          tokenRefresh OA2
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
