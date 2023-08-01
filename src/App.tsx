import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import RegisterPage from "./components/Pages/RegistPage/RegistPage";
import AuthenticationPage from "./components/Pages/SocialLogin/AuthenticationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import { BottomNavigation } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/regist' element={<RegisterPage />} />
          <Route path='/kakaoAuth' element={<AuthenticationPage />} />
        </Routes>
      </BrowserRouter>
      <BottomNavigation />
    </QueryClientProvider>
  );
}

export default App;
