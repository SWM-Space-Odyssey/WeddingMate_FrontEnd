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
        <Suspense fallback={<LodingSpinner />}>
          <div className='h-full flex flex-col'>
            <div className='flex-1 relative flex overflow-y-scroll flex-col'>
              <Routes>
                <Route path='/' element={<FeedPage />} />
                <Route path='/regist' element={<RegisterPage />} />
                <Route path='/planner/:Id' element={<PlannerPage />} />
                <Route path='/plannermypage' element={<PlannerPage mypage />} />
                <Route path='/item/:itemId' element={<ItemPage />} />
                <Route path='/portfolio/:itemId' element={<PortfolioPage />} />
                <Route
                  path='/create/portfolio/:portfolioId?'
                  element={<PortfolioCreate />}
                />
                <Route
                  path='/create/item/:portfolioId/:order/:itemId?'
                  element={<ItemCreate />}
                />
                <Route
                  path='/oauth2/redirect'
                  element={<LodingSpinner redirect />}
                />
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
