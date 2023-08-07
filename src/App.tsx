import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import RegisterPage from "./components/Pages/RegistPage/RegistPage";
import AuthenticationPage from "./components/Pages/SocialLogin/AuthenticationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "./components/NavBar/NavBar";
import FeedPage from "./components/Pages/FeedPage/FeedPage";
import PlannerPage from "./components/Pages/PlannerPage/PlannerPage";
import LodingSpinner from "./components/Modules/LodingSpinner";
import PortfolioCreate from "./components/Pages/CreatePage/PortfolioCreate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='h-full flex flex-col pb-28'>
          <div className='flex-1 relative flex overflow-y-scroll'>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/regist' element={<RegisterPage />} />
              <Route
                path='/create/portfolio/:itemId?'
                element={<PortfolioCreate />}
              />
              <Route path='/feed' element={<FeedPage />} />
              <Route path='/planner' element={<PlannerPage />} />
              <Route path='/oauth2/redirect' element={<LodingSpinner />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </div>
        <NavBar />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
