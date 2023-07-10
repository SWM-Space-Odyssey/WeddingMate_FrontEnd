import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import AuthenticationPage from "./components/SocialLogin/AuthenticationPage";
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
