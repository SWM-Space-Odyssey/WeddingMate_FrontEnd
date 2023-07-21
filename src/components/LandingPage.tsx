import { Box } from "@mui/material";
import Header from "./Header/Header";
import RegistComponent from "./Regist/RegistComponent";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Box className='h-full flex flex-col '>
      <Header />
      <div className='flex-1 relative'>
        {/* <Typography variant='h2'>LandingPage - 입니다</Typography>
      <Button href='/regist'>RegistPage</Button> */}
        <RegistComponent />
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
