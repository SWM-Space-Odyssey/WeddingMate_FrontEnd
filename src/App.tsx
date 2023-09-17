import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import RegisterPage from "./components/Pages/RegistPage/RegistPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedPage from "./components/Pages/FeedPage/FeedPage";
import PlannerPage from "./components/Pages/PlannerPage/PlannerPage";
import LoadingSpinner from "./components/Modules/LoadingSpinner";
import PortfolioCreate from "./components/Pages/CreatePage/PortfolioCreate";
import PortfolioPage from "./components/Pages/PortfolioPage/PortfolioPage";
import ItemCreate from "./components/Pages/CreatePage/ItemCreate";
import ItemPage from "./components/Pages/ItemPage/ItemPage";
import { Suspense } from "react";
import Auth from "./hoc/auth";
import EarlyAccessPage from "./components/Pages/EarlyAcccessPage";
import RedirectPage from "./components/Pages/RedirectPage";
import SearchPage from "./components/Pages/SearchPage/SearchPage";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});
const AuthFeedPage = Auth(FeedPage, "all");
const AuthItemPage = Auth(ItemPage, "all");
const AuthPlannerPage = Auth(PlannerPage, "all");
const AuthPortfolioPage = Auth(PortfolioPage, "all");
const AuthSearchPage = Auth(SearchPage, "all");
const AuthRegisterPage = Auth(RegisterPage, "unregistered");
const AuthItemCreate = Auth(ItemCreate, "planner");
const AuthPlannerMyPage = Auth(PlannerPage, "planner");
const AuthPortfolioCreate = Auth(PortfolioCreate, "planner");
const AuthEarlyAccessPage = Auth(EarlyAccessPage, "customer");
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <div className='h-full flex flex-col'>
            <Header />
            <div className='flex-1 relative flex overflow-y-scroll flex-col'>
              <Routes>
                <Route path='/' element={<AuthFeedPage />} />
                <Route path='/earlyaccess' element={<AuthEarlyAccessPage />} />
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
                  element={<LoadingSpinner redirect />}
                />
                <Route path='/login' element={<FeedPage guide />} />
                <Route path='/admin' element={<MainPage />} />
                <Route path='/search/:search?' element={<AuthSearchPage />} />

                {/* <Route path='/spinner/:timeout' element={<LodingSpinner />} /> */}
                <Route path='/redirect' element={<RedirectPage />} />
              </Routes>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </div>
            <NavBar />
          </div>
          {/* <NavBar /> */}
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
