import { useQuery } from "@tanstack/react-query";
import { getPortfolio, getPortfolioDetail } from "../api/portfolio";
import { getUserInfo } from "../api/user";

export const usePortfolioCheck = (
  portfolioId: number,
  isMypage: boolean | undefined
) => {
  return useQuery(
    ["portfolioCheck", portfolioId, isMypage],
    () => getPortfolio(portfolioId, isMypage),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const usePortfolioDetail = (portfolioId: number) => {
  return useQuery(["portfolioDetail"], () => getPortfolioDetail(portfolioId), {
    refetchOnWindowFocus: false,
  });
};

export const useUserInfo = (plannerId?: number) => {
  return useQuery(["userInfo", plannerId], () => getUserInfo(plannerId), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};
