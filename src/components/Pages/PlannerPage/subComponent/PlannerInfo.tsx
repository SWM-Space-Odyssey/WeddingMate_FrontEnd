import React, { Suspense } from "react";
import CustomText from "../../../Modules/CustomText";
import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { useQuery } from "@tanstack/react-query";
import {
  MY_ACCESS_KEY,
  SERVER_IMAGE_URL,
  SERVER_URL,
} from "../../../../common/constants";
import axios from "axios";
const mockTag = ["친절한", "답변이빠른", "꼼꼼한"];

type Props = {};

const PlannerInfo = (props: Props) => {
  const { data, isLoading } = useQuery(
    ["plannerInfo"],
    () =>
      axios.get(`${SERVER_URL}/api/v1/profile/planner`, {
        headers: {
          Authorization: `Bearer ${MY_ACCESS_KEY}`,
        },
        withCredentials: true,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const response = data?.data;
  return (
    <div>
      {isLoading && <div>loading...</div>}
      {data && (
        <div className='flex flex-col items-center mt-4 gap-2'>
          <img
            src={`${SERVER_IMAGE_URL}${response?.data.profileImageUrl}`}
            className='w-[84px] h-[84px] rounded-full  object-cover'
          />
          <div className='flex flex-col items-center gap-0.5'>
            <CustomText text='플래너' type='Title-large' />
            <CustomText text='소속/직급/서울' type='Description' />
          </div>
          <CustomTagBlock spreadValues={mockTag} />
        </div>
      )}
    </div>
  );
};

export default PlannerInfo;
