import React, { useEffect, useState } from "react";
import PlannerInfo from "../PlannerPage/subComponent/PlannerInfo";
import SettingList from "./sections/SettingList";
import { Box, Slide } from "@mui/material";
import RegistUserInfo from "../RegistPage/subComponents/RegistUserInfo";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../common/constants";
import { dateFormatter, getAccessToken } from "../../../hooks/apiHook";
import {
  RegistCoupleTag1,
  RegistCoupleTag2,
} from "../RegistPage/subComponents/RegistCoupleTag";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { editCustomerProfile } from "../../../api/user";

type Props = {};

type nickname = {
  nickname: string;
};

type customerInfo = {
  weddingDate: string;
  weddingDateConfirmed: string;
  regionList: string;
  budget: string;
};
type customerTagList = {
  dressTagList: string;
  makeupTagList: string;
  studioTypeTagList: string;
  studioFocusTagList: string;
};
type submitTagList = {
  portfolioTagList: string;
  plannerTagList: string;
};
type formTagList = {
  portfolioTagList: string[];
  plannerTagList: string[];
};
type IuserProfile = nickname & {
  customerInfo: customerInfo;
  customerTagList: submitTagList & customerTagList;
};
type IformProfile = customerInfo &
  customerTagList &
  formTagList &
  nickname & { region: string[] };
const SettingPage = (props: Props) => {
  const navigate = useNavigate();
  const methods = useForm<plannerRegister | coupleRegister>();
  const requestURL = `/api/v1/profile/customer`;
  const [searchParams, setSearchParams] = useSearchParams();
  const MY_ACCESS_KEY = getAccessToken();
  const [view, setView] = useState<"info" | "tags" | "default">("default");
  const { data, isLoading, isSuccess } = useQuery(
    ["plannerInfo"],
    () =>
      axios.get(`${SERVER_URL}${requestURL}`, {
        headers: {
          Authorization: `Bearer ${MY_ACCESS_KEY}`,
        },
        withCredentials: true,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data && isSuccess) {
      const formData = data.data.data;
      methods.reset({
        ...formData.customerInfoDto,
        ...formData.customerTagListDto,
        ...formData,
      });
    }
  }, [data]);

  useEffect(() => {
    const type = searchParams.get("type") as "info" | "tags" | undefined;
    if (type === "info") {
      setView("info");
    } else if (type === "tags") {
      setView("tags");
    } else {
      setView("default");
    }
  }, [searchParams]);

  const onSubmit: SubmitHandler<any> = async (data: IformProfile) => {
    const dirtyChecker = (arg: string | string[]) => {
      if (typeof arg === "string") {
        return false;
      } else {
        return true;
      }
    };
    const customerRegion = data.region
      ? data.region.join(",")
      : data.regionList;
    const customerPlannerList = dirtyChecker(data.plannerTagList)
      ? data.plannerTagList.join(",")
      : (data.plannerTagList as unknown as string);
    const customerPortfolioList = dirtyChecker(data.portfolioTagList)
      ? data.portfolioTagList.join(",")
      : (data.portfolioTagList as unknown as string);
    const formDate = data.weddingDate as unknown as Date;
    methods.setValue("regionList", customerRegion);
    const body: IuserProfile = {
      nickname: data.nickname,
      customerInfo: {
        weddingDate: data.weddingDate,
        weddingDateConfirmed: data.weddingDateConfirmed,
        // weddingDate: "",
        // weddingDateConfirmed: "false",
        regionList: customerRegion,
        budget: data.budget,
      },
      customerTagList: {
        portfolioTagList: customerPortfolioList,
        plannerTagList: customerPlannerList,
        // portfolioTagList: "감성있는",
        // plannerTagList: "친절한",
        dressTagList: data.dressTagList,
        makeupTagList: data.makeupTagList,
        studioTypeTagList: data.studioTypeTagList,
        studioFocusTagList: data.studioFocusTagList,
      },
    };
    editCustomerProfile(body).then((res) => {
      if (res?.status === "SUCCESS") {
        navigate("/plannermypage/setting");
      } else {
        alert("회원정보 수정에 실패하였습니다!");
      }
    });

    // const response = await editPlannerProfile(body);
    // if (response.status === 200 && response.data.status === "SUCCESS") {
    //   alert("회원정보가 수정되었습니다.");
    //   navigate(0);
    // } else {
    //   alert("회원정보 수정에 실패하였습니다.");
    // }
  };

  return (
    <div>
      <Slide
        in={view === "default"}
        direction={view === "default" ? "left" : "right"}
      >
        <div className='absolute w-full'>
          <PlannerInfo mypage />
          <SettingList />
        </div>
      </Slide>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Slide unmountOnExit in={view === "info"} direction={"left"}>
            <div>
              <RegistUserInfo adjust />
            </div>
          </Slide>
          <Slide
            unmountOnExit
            in={view === "tags"}
            direction={view === "tags" ? "left" : "right"}
          >
            <div>
              <RegistCoupleTag1 adjust />
              <Box sx={{ height: `8px`, bgcolor: "#F5F5F5", mt: "28px" }} />
              <RegistCoupleTag2 adjust />
            </div>
          </Slide>
        </form>
      </FormProvider>
    </div>
  );
};

export default SettingPage;
