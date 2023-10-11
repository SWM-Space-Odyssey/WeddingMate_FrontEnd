import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomInput from "../../Modules/Custom/CustomInput";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import CustomTagBlock from "../../Modules/Custom/CustomTagBlock";
import { PlannerTagList } from "../../../common/TagList";
import { CountryList } from "../../../common/CountryLIst";
import { editPlannerProfile } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";

type Props = {
  data: {
    nickname: string;
    plannerInfo: {
      company: string;
      position: string;
      regionList: string;
      tagList: string;
    };
    plannerProfileInfo: {
      sns: string;
      bio: string;
    };
  };
};
type plannerProfile = {
  nickname: string;
  company: string;
  position: string;
  regionList: string[];
  tagList: string[];
  sns: string;
  bio: string;
};
const nicknameContent = {
  state: "nickname" as const,
  title: "닉네임",
  placeholder: "WM플래너",
  required: true,
};
const snsContent = {
  state: "sns" as const,
  title: "SNS",
  placeholder: "WED_WM",
  required: false,
};
const bioContent = {
  state: "bio" as const,
  title: "플래너 소개",
  placeholder: "자기소개를 입력해주세요",
  required: false,
  multiline: true,
  textCount: true,
};
const companyContent = {
  state: "company" as const,
  title: "회사명",
  placeholder: "WM웨딩",
  required: true,
};
const positionContent = {
  state: "position" as const,
  title: "현재 직책",
  placeholder: "팀장 / 수석",
  required: true,
};
const regionContent = {
  state: "regionList" as const,
  title: "활동 지역",
  placeholder: "활동 지역을 입력해주세요",
};
const ProfileDialog = (props: Props) => {
  const methods = useForm<plannerProfile>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [initPlannerRegion, setInitPlannerRegion] = useState<string[]>([]);
  const [initPlannerTag, setInitPlannerTag] = useState<string[]>([]);

  const snackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const validChecker = (data: plannerProfile) => {
    const { nickname, company, position, regionList, tagList } = data;
    if (
      !nickname ||
      !company ||
      !position ||
      !regionList ||
      !tagList ||
      regionList.length === 0 ||
      tagList.length === 0
    ) {
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const handleClose = (submit?: boolean) => {
    if (submit) return setOpen(false);
    if (confirm("정말로 닫으시겠습니까?")) setOpen(false);
  };

  const onSubmit: SubmitHandler<plannerProfile> = async (data) => {
    const isValid = validChecker(data);
    const { nickname, company, position, regionList, tagList, sns, bio } = data;
    if (!isValid) return;
    const body = {
      nickname,
      plannerInfo: {
        company,
        position,
        regionList: regionList.join(","),
        tagList: tagList.join(","),
      },
      plannerProfileInfo: {
        sns,
        bio,
      },
    };
    const response = await editPlannerProfile(body);
    if (response.status === 200 && response.data.status === "SUCCESS") {
      alert("회원정보가 수정되었습니다.");
      navigate(0);
    } else {
      alert("회원정보 수정에 실패하였습니다.");
    }
  };

  useEffect(() => {
    if (props.data) {
      const { nickname, plannerInfo, plannerProfileInfo } = props.data;
      const { company, position, regionList, tagList } = plannerInfo;
      const { sns, bio } = plannerProfileInfo;
      setInitPlannerRegion(regionList.split(","));
      setInitPlannerTag(tagList.split(","));
      const form = {
        nickname,
        company,
        position,
        regionList: regionList.split(","),
        tagList: tagList.split(","),
        sns,
        bio,
      };
      methods.reset(form);
    }
  }, [props.data]);
  const stopPropagationForTab = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };
  return (
    <div>
      <div onClick={handleClickOpen}>
        회원 정보 수정
        {/* <Settings color='secondary' fontSize='large' /> */}
      </div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        onKeyDown={stopPropagationForTab}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogTitle className='sticky'>회원 정보 수정</DialogTitle>
            <div>
              <DialogContent>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-1.5'>
                    <CustomInput
                      required
                      content={nicknameContent}
                      validate={2}
                    />
                    <CustomInput content={snsContent} />
                  </div>
                  <div className='flex gap-1.5'>
                    <CustomInput required content={companyContent} />
                    <CustomInput required content={positionContent} />
                  </div>
                  {/* <CustomInput content={regionContent} /> */}
                  <CustomTagBlock
                    title='활동 지역'
                    spreadValues={CountryList}
                    formState='regionList'
                    initValue={initPlannerRegion}
                    required
                  />
                  <CustomTagBlock
                    title='태그'
                    spreadValues={PlannerTagList}
                    formState='tagList'
                    initValue={initPlannerTag}
                    maxTag={2}
                    required
                  />
                  <CustomInput content={bioContent} />
                </div>
              </DialogContent>
            </div>
            <DialogActions>
              <Button
                type='button'
                variant='outlined'
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
              <Button variant='contained' type='submit' sx={{ color: "white" }}>
                제출
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
        <Snackbar
          open={snackbarOpen}
          onClose={snackbarClose}
          autoHideDuration={1500}
        >
          <Alert severity='error'>필수입력 항목을 확인해주세요 !</Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
};

export default ProfileDialog;
