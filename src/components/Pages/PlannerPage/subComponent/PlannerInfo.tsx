import React, { Suspense, useEffect, useState } from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import {
  // MY_ACCESS_KEY,
  SERVER_IMAGE_URL,
} from "../../../../common/constants";
import { useParams } from "react-router-dom";
import { Badge, Button, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { editProfileImg } from "../../../../api/user";
import { useUserInfo } from "../../../../hooks/QueryHooks";

type Props = {
  mypage?: boolean;
};
const PlannerInfo = (props: Props) => {
  const MY_ACCESS_KEY = localStorage.getItem("accessToken");
  const [imgURL, setImgURL] = useState("");
  const plannerId = parseInt(useParams().Id ?? "0");
  const { data, isLoading } = useUserInfo(plannerId);
  // const requestURL = props.mypage
  //   ? `/api/v1/profile/customer`
  //   : `/api/v1/customer/${plannerId}`;
  // const { data, isLoading } = useQuery(
  //   ["plannerInfo", plannerId],
  //   () =>
  //     axios.get(`${SERVER_URL}${requestURL}`, {
  //       headers: {
  //         Authorization: `Bearer ${MY_ACCESS_KEY}`,
  //       },
  //       withCredentials: true,
  //     }),
  //   {
  //     refetchOnWindowFocus: false,
  //     staleTime: 1000 * 60,
  //   }
  // );
  const { nickname, profileImageUrl, plannerInfo, plannerProfileInfo } =
    data?.data;
  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const { status, data } = await editProfileImg(formData);
      if (status === 200 && data.status === "SUCCESS") {
        let responseURL = data.data;
        if (props.mypage) {
          responseURL += `?key=${Date.now()}`;
        }
        setImgURL(responseURL);
      }
    }
  };

  const badge = (
    <IconButton
      sx={{
        mb: 2,
        mr: 2,
        bgcolor: "white",
        border: "1px solid",
        ":hover": { bgcolor: "white" },
      }}
      size='small'
      component='label'
    >
      <Edit fontSize='small' />
      <input
        type='file'
        hidden
        accept='image/*'
        maxLength={1}
        onChange={imageUpload}
      />
    </IconButton>
  );
  useEffect(() => {
    if (profileImageUrl) setImgURL(profileImageUrl);
  }, [profileImageUrl]);

  return (
    <div>
      {data && (
        <div className='flex flex-col items-center mt-4 gap-2'>
          {props.mypage && ( // Mypage
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={badge}
            >
              <img
                src={`${SERVER_IMAGE_URL}${imgURL}`}
                className='w-[84px] h-[84px] rounded-full  object-cover'
              />
            </Badge>
          )}
          {!props.mypage && ( // PlannerPage
            <img
              src={`${SERVER_IMAGE_URL}${imgURL}`}
              className='w-[84px] h-[84px] rounded-full  object-cover'
            />
          )}
          <div className='flex flex-col items-center gap-0.5'>
            <CustomText
              text={`${nickname ? nickname : "사용자이름"}`}
              type='Title-large'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerInfo;
