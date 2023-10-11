import React from "react";
import { useNavigate } from "react-router-dom";
import CustomText from "./Custom/CustomText";
import { ArrowForward, ArrowForwardIos } from "@mui/icons-material";

type Props = {
  title: string;
  subtitle?: string;
  buttonURL?: string;
};

const SectionHeader = (props: Props) => {
  const { title, subtitle, buttonURL } = props;
  const navigate = useNavigate();
  return (
    <div className='flex justify-between'>
      <div>
        <CustomText type='Title-base' text={title} />
        {subtitle && <CustomText type='SubContent' text={subtitle} />}
      </div>
      {buttonURL && (
        <a
          href={buttonURL}
          className='text-sm text-[#395DDF] flex items-center'
        >
          더보기
          <ArrowForwardIos sx={{ fontSize: "14px", height: "24px" }} />
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
