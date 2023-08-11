import React from "react";

import CustomTagBlock from "../../../Modules/CustomTagBlock";

type Props = {};

const Mock = ["화려한", "사람많은", "야외"];

const PortfolioHeader = (props: Props) => {
  return (
    <div className='flex flex-row gap-2.5 mt-5'>
      <div>
        <img
          src={
            "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg"
          }
          className='w-[5.5rem] h-[5.5rem] rounded-sm'
        />
      </div>
      <div>
        <div className='font-bold leading-tight mb-1.5'>PF-TITLE</div>
        <div className='text-xs leading-tight mb-1'>Location : Seoul</div>
        <div>
          <div className='text-xs leading-tight mb-1'>Mood</div>
          <div>
            <CustomTagBlock spreadValues={Mock} />
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
