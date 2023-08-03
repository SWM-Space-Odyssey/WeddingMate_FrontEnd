import { BottomNavigation, Box, Button } from "@mui/material";
import Header from "../Header/Header";
import RegistComponent from "./RegistPage/RegistPage";
import PortfolioCreate from "./PortfolioPage/PortfolioCreate";
import PortfolioPage from "./PortfolioPage/PortfolioPage";
import ItemPage from "./ItemPage/ItemPage";
import ItemCreate from "./ItemPage/ItemCreate";
import { useDispatch } from "react-redux";
import { intoView } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlannerPage from "./PlannerPage/PlannerPage";
import { Feed } from "@mui/icons-material";
import FeedPage from "./FeedPage/FeedPage";

type Props = {};
const KAKAO_LOGIN_URL =
  "https://api.weddingmate.co.kr/oauth2/authorization/kakao";

const MainPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParmas] = useSearchParams();
  if (searchParmas.get("accessToken")) {
    console.log(searchParmas.get("accessToken"));
    navigate("/");
  }

  // console.log(searchParmas.get("accessToken"));

  return (
    <Box className='h-full flex flex-col mainpage'>
      <div className='flex-1 relative flex overflow-y-scroll'>
        <RegistComponent />
        <PortfolioCreate />
        <PortfolioPage />
        <ItemPage />
        <PlannerPage />
        <FeedPage />
        {/* <SocialLogin />
      <SocialLogout /> */}
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
            onClick={() => dispatch(intoView({ view: "PortfolioCreate" }))}
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
          <Button href={KAKAO_LOGIN_URL}>just-href</Button>
        </div>
      </div>
    </Box>
  );
};

export default MainPage;
