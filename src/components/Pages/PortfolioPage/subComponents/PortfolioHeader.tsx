import React, { useEffect, useState } from "react";

import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import { CountryList } from "../../../../common/CountryLIst";

type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};

type Props = {
  data: {
    title: string;
    tagResDtoList: tagResDtoList[];
    repImgUrl: string;
  };
};

const Mock = ["화려한", "사람많은", "야외"];

const PortfolioHeader = (props: Props) => {
  const { title, tagResDtoList, repImgUrl } = props.data;
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState<string[]>([]);
  useEffect(() => {
    const moodlist: string[] = [];
    tagResDtoList.forEach((tag) => {
      if (CountryList.includes(tag.content)) {
        setLocation(tag.content);
      } else {
        moodlist.push(tag.content);
      }
    });
    setMood(moodlist);
  }, [tagResDtoList]);

  return (
    <div className='flex flex-row gap-2.5 mt-5'>
      <div>
        <img
          src={`${SERVER_IMAGE_URL}${repImgUrl}`}
          className='w-[5.5rem] h-[5.5rem] rounded-sm'
        />
      </div>
      <div>
        <div className='font-bold leading-tight mb-1.5'>{title}</div>
        <div className='text-xs leading-tight mb-1'>Location : {location}</div>
        <div>
          <div className='text-xs leading-tight mb-1'>Mood</div>
          <div>
            <CustomTagBlock spreadValues={mood} />
          </div>
        </div>
      </div>
      <div>
        <button>수정하기</button>
      </div>
    </div>
  );
};

export default PortfolioHeader;
