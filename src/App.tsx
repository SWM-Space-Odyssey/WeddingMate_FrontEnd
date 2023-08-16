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
import PortfolioPage from "./components/Pages/PortfolioPage/PortfolioPage";
import ItemCreate from "./components/Pages/CreatePage/ItemCreate";
import ItemPage from "./components/Pages/ItemPage/ItemPage";
import { Suspense } from "react";
import Auth from "./hoc/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});
const AuthPlannerPage = Auth(PlannerPage, "all");
const AuthPlannerMyPage = Auth(PlannerPage, "planner");
const AuthRegisterPage = Auth(RegisterPage, "unregistered");
const AuthFeedPage = Auth(FeedPage, "all");
const AuthPortfolioPage = Auth(PortfolioPage, "all");
const AuthItemPage = Auth(ItemPage, "all");
const AuthItemCreate = Auth(ItemCreate, "planner");
const AuthPortfolioCreate = Auth(PortfolioCreate, "planner");
const AuthLoginGuidePage = Auth(FeedPage, "unregistered");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LodingSpinner />}>
          <div className='h-full flex flex-col'>
            <div className='flex-1 relative flex overflow-y-scroll flex-col'>
              <Routes>
                <Route path='/' element={<AuthFeedPage />} />
                <Route path='/regist' element={<AuthRegisterPage />} />
                <Route path='/planner/:Id' element={<AuthPlannerPage />} />
                <Route
                  path='/plannermypage'
                  element={<AuthPlannerMyPage mypage />}
                />
                <Route path='/item/:itemId' element={<AuthItemPage />} />
                <Route
                  path='/portfolio/:itemId'
                  element={<AuthPortfolioPage />}
                />
                <Route
                  path='/create/portfolio/:portfolioId?'
                  element={<AuthPortfolioCreate />}
                />
                <Route
                  path='/create/item/:portfolioId/:order/:itemId?'
                  element={<AuthItemCreate />}
                />
                <Route
                  path='/oauth2/redirect'
                  element={<LodingSpinner redirect />}
                />
                <Route path='/login' element={<AuthLoginGuidePage guide />} />
                <Route path='/admin' element={<MainPage />} />
                {/* <Route path='/spinner/:timeout' element={<LodingSpinner />} /> */}
              </Routes>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </div>
          </div>
          {/* <NavBar /> */}
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
