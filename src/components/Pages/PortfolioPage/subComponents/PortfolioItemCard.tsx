import React from "react";
import CustomText from "../../../Modules/CustomText";
import { useDispatch } from "react-redux";
import { intoView } from "../../../../store/viewSlice";

type Props = {};
interface itemAdjustStates {
  categoryContent: string;
  itemTagList: string[];
  itemRecord: string;
  company?: string;
  date?: string;
  pictures?: string[];
}

type cardData = {
  itemRecord: string;
  portfolioId: number;
  itemTagList: string[];
  categoryContent: string;
  pictures: string[];
  order: number;
  itemId: number;
  company?: string;
  date?: string;
};
const PortfolioItemCard = (props: Props) => {
  const getItemCard = (mockData: cardData[]) => {
    return mockData.map((item, index) => {
      return (
        <div className='flex flex-col gap-1.5' key={index} onClick={() => {}}>
          <CustomText type='Title-base' text={item.categoryContent} />
          <div
            onClick={() => {}}
            className='relative rounded border shadow-md p-4 hover:cursor-pointer'
            key={index}
          >
            <div>
              <div>{item?.date}</div>
              <div>{item.itemRecord}</div>
            </div>
            <div>
              <div className='flex flex-row gap-2'>
                {item.pictures?.map((picture, index) => {
                  return (
                    <img
                      key={index}
                      src={picture}
                      className='w-[5.5rem] h-[5.5rem] rounded-sm border'
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className='flex flex-col gap-6'>{getItemCard(itemMock)}</div>;
};

export default PortfolioItemCard;

const itemMock = [
  {
    itemRecord: "너무 예쁜 드레스를 입은 신부님",
    company: "두근두근 웨딩",
    date: "2023.03.30",
    portfolioId: 17,
    itemTagList: ["고급스러운", "러블리"],
    categoryContent: "드레스",
    order: 1,
    itemId: 4,
    pictures: [
      "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg",
      "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg",
      "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg",
    ],
  },
  {
    itemRecord: "목데이터입니다",
    company: "르웨딩",
    date: "2023.05.21",
    portfolioId: 17,
    itemTagList: ["고급스러운", "러블리"],
    categoryContent: "스튜디오",
    order: 1,
    itemId: 5,
    pictures: [
      "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg",
      "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg",
      "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/73ed1bb6b203e6df219acb613b4b6960.jpg",
    ],
  },
];
