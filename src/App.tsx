import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import RegisterPage from "./components/Pages/RegistPage/RegisterPage";
import AuthenticationPage from "./components/Pages/SocialLogin/AuthenticationPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/regist' element={<RegisterPage />} />
        <Route path='/kakaoAuth' element={<AuthenticationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
