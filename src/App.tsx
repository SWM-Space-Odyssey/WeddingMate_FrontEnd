import { Box, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/regist' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
