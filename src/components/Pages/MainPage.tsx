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
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const tokenRefresh = async () => {
    // refresh token is in https cookie
    const { data } = await axios.get(
      "https://api.weddingmate.co.kr/api/v1/token/refresh",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          withCredentials: true,
        },
      }
    );
    console.log(data);
  };

  return (
    <div className='flex-1 relative flex overflow-y-scroll pt-12'>
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
        <Button href={KAKAO_LOGIN_URL}>LoginButton</Button>
        <Button
          onClick={() => {
            tokenRefresh();
          }}
        >
          tokenRefresh OA2
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
