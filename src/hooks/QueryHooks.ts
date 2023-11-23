import { useQuery } from "@tanstack/react-query";
import { getPortfolio, getPortfolioDetail } from "../api/portfolio";
import { getUserInfo } from "../api/user";
import {
  CommunityParams,
  getCommunityList,
  getCommunityPost,
} from "../api/community";
import { getCompanyDetail } from "../api/company";

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

export const useCommunityList = (params: number) => {
  return useQuery(["communityList", params], () => getCommunityList(params), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};

export const useCommunityPost = (postId: number) => {
  return useQuery(["communityPost", postId], () => getCommunityPost(postId), {
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export const useCompanyDetail = (companyId: number) => {
  return useQuery(
    ["companyDetail", companyId],
    () => getCompanyDetail(companyId),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    }
  );
};
