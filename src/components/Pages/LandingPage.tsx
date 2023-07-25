import { Box } from "@mui/material";
import Header from "../Header/Header";
import RegistComponent from "./Regist/RegistComponent";
import PortfolioCreate from "./Portfolio/PortfolioCreate";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Box className='h-full flex flex-col '>
      <Header />
      <div className='flex-1 relative'>
        <RegistComponent />
        {/* <PortfolioCreate /> */}
        {/* <SocialLogin />
      <SocialLogout /> */}
        {/* <Typography>REDUX Value : {user}</Typography>
      <Button onClick={() => dispatch(ReduxLogin())}>Login</Button>
    <Button onClick={() => dispatch(ReduxLogout())}>LogOut</Button> */}
      </div>
    </Box>
  );
};

export default LandingPage;
