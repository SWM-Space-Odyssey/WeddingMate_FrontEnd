import { Box, Button } from "@mui/material";
import Header from "../Header/Header";
import RegistComponent from "./RegistPage/RegistComponent";
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

type Props = {};
const KAKAO_LOGIN_URL =
  "http://ec2-3-39-119-130.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/kakao";

const MainPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParmas] = useSearchParams();
  if (searchParmas.get("accessToken")) {
    console.log(searchParmas.get("accessToken"));
    navigate("http://localhost:5173");
  }

  // console.log(searchParmas.get("accessToken"));

  return (
    <Box className='h-full flex flex-col '>
      <Header />
      <div className='flex-1 relative flex'>
        <RegistComponent />
        <PortfolioCreate />
        <PortfolioPage />
        <ItemPage />
        <PlannerPage />
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
            onClick={() => dispatch(intoView("Regist"))}
          >
            RegistPage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoView("PortfolioCreate"))}
          >
            PortfolioCreatePage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoView("Portfolio"))}
          >
            PortfolioPage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoView("Item"))}
          >
            ItemPage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoView("ItemCreate"))}
          >
            ItemCreatePage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoView("Planner"))}
          >
            PlannerPage
          </Button>
          <Button href={KAKAO_LOGIN_URL}>just-href</Button>
        </div>
      </div>
    </Box>
  );
};

export default MainPage;
