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
  const view = useSelector((state: RootState) => state.view.currentView);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParmas] = useSearchParams();
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
      <PortfolioCreate />
      <PortfolioPage />
      <ItemPage />
      <PlannerPage />
      <FeedPage />
      <ItemCreate />
      <div
        className={`${
          view === "LandingPage" ? "" : "hidden"
        } flex flex-col gap-4`}
      >
        <Button
          variant='contained'
          onClick={() => dispatch(intoView({ view: "Regist" }))}
        >
          RegistPage
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            dispatch(intoView({ view: "PortfolioCreate" }));
            navigate("/create/portfolio/1");
          }}
        >
          PortfolioCreatePage
        </Button>
        <Button
          variant='contained'
          onClick={() => dispatch(intoView({ view: "Portfolio" }))}
        >
          PortfolioPage
        </Button>
        <Button
          variant='contained'
          onClick={() => dispatch(intoView({ view: "Item" }))}
        >
          ItemPage
        </Button>
        <Button
          variant='contained'
          onClick={() => dispatch(intoView({ view: "ItemCreate" }))}
        >
          ItemCreatePage
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            dispatch(intoView({ view: "Planner", requestParam: "1" }))
          }
        >
          PlannerPage
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            dispatch(intoView({ view: "Feed", requestParam: "1" }))
          }
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
