import { Box, Button } from "@mui/material";
import Header from "../Header/Header";
import RegistComponent from "./RegistPage/RegistComponent";
import PortfolioCreate from "./PortfolioPage/PortfolioCreate";
import PortfolioPage from "./PortfolioPage/PortfolioPage";
import ItemPage from "./ItemPage/ItemPage";
import ItemCreate from "./ItemPage/ItemCreate";
import { useDispatch } from "react-redux";
import {
  intoItemCreatePage,
  intoItemPage,
  intoPortfolioCreatePage,
  intoPortfolioPage,
  intoRegistPage,
} from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Props = {};

const LandingPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const dispatch = useDispatch();
  return (
    <Box className='h-full flex flex-col '>
      <Header />
      <div className='flex-1 relative flex'>
        <RegistComponent />
        <PortfolioCreate />
        <PortfolioPage />
        <ItemPage />
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
            onClick={() => dispatch(intoRegistPage())}
          >
            RegistPage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoPortfolioCreatePage())}
          >
            PortfolioCreatePage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoPortfolioPage())}
          >
            PortfolioPage
          </Button>
          <Button variant='contained' onClick={() => dispatch(intoItemPage())}>
            ItemPage
          </Button>
          <Button
            variant='contained'
            onClick={() => dispatch(intoItemCreatePage())}
          >
            ItemCreatePage
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default LandingPage;
