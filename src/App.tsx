import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedPage from "./components/Pages/FeedPage/FeedPage";
import LoadingSpinner from "./components/Modules/LoadingSpinner";
import { Suspense } from "react";
import RedirectPage from "./components/Pages/RedirectPage";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import CommunityPage from "./components/Pages/CommutityPage/CommunityPage";
import {
  AuthFeedPage,
  AuthItemCreate,
  AuthItemPage,
  AuthLikePage,
  AuthPlannerMyPage,
  AuthPlannerPage,
  AuthPortfolioCreate,
  AuthPortfolioPage,
  AuthRegisterPage,
  AuthSearchPage,
  AuthSettingPage,
} from "./hoc/AuthPages";
import ChannelService from "./hooks/ChannelService";
import { CHANNEL_PLUGIN_KEY } from "./common/constants";
import CompanyPage from "./components/Pages/CompanyPage/CompanyPage";
import LikePage from "./components/Pages/LikePage/LikePage";
import LoginError from "./components/Modules/LoginError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});
ChannelService.boot({
  pluginKey: CHANNEL_PLUGIN_KEY, // fill your plugin key
});
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
                <Route path='/regist' element={<AuthRegisterPage />} />
                <Route path='/planner/:Id' element={<AuthPlannerPage />} />

                <Route
                  path='/plannermypage'
                  element={<AuthPlannerMyPage mypage />}
                />
                <Route
                  path='/plannermypage/setting'
                  element={<AuthSettingPage />}
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
                <Route path='/company' element={<CompanyPage />} />
                <Route path='/like' element={<AuthLikePage />} />

                <Route
                  path='/oauth2/redirect'
                  element={<LoadingSpinner redirect />}
                />
                <Route path='/login' element={<FeedPage guide />} />
                <Route path='/admin' element={<MainPage />} />
                <Route path='/search/:search?' element={<AuthSearchPage />} />
                <Route path='/redirect' element={<RedirectPage />} />
                <Route path='/community' element={<CommunityPage />} />
                <Route path='/oauth2/error' element={<LoginError />} />
                <Route path='*' element={<RedirectPage />} />
              </Routes>
            </div>
            <NavBar />
          </div>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
