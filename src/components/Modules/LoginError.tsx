import { Button } from "@mui/material";
import React from "react";

type Props = {};

const LoginError = (props: Props) => {
  return (
    <div className='absolute h-full w-full top-0 flex flex-col items-center justify-center text-sm'>
      <div className='text-[5rem] py-10'>😭</div>
      <div className='text-lg font-sans font-bold'>회원가입에 실패했습니다</div>
      <div>저희 서비스는 20-30대 유저만을 모집하고 있습니다</div>
      <br />
      <div>1. 서비스 타겟 연령대가 아니시거나</div>
      <div>2. 연령대 정보 제공에 수락하지 않으셨습니다!</div>
      <a className='mt-2' href='/login'>
        <Button>확인</Button>
      </a>
    </div>
  );
};

export default LoginError;
