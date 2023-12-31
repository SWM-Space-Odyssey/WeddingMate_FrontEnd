import React from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import { useDispatch } from "react-redux";
import { intoView } from "../../../../store/viewSlice";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import { useNavigate } from "react-router-dom";
import CustomTagBlock from "../../../Modules/Custom/CustomTagBlock";

type Props = {
  cardData: cardData[];
};

const PortfolioItemCard = (props: Props) => {
  const navigate = useNavigate();
  const getItemCard = (mockData: cardData[]) => {
    const tagList = props.cardData.map((item) => {
      const arr: string[] = [];
      item.itemTagList.split(",").map((tag) => {
        arr.push(tag);
      });
      return arr;
    });
    return mockData.map((item, index) => {
      return (
        <div
          className='flex flex-col gap-1.5'
          key={index}
          onClick={() => {
            navigate(`/item/${item.itemId}`);
          }}
        >
          <CustomText type='Title-base' text={item.category} />
          <div
            onClick={() => {}}
            className='flex flex-col gap-2 relative rounded border shadow-md p-4 hover:cursor-pointer overflow-hidden'
            key={index}
          >
            <div className='flex flex-col gap-1'>
              <CustomText type='Title' text={item?.date} />
              <CustomText type='Content-small' text={item.itemRecord} />
              {/* <div>{item?.date}</div>
              <div>{item.itemRecord}</div> */}
            </div>
            <div>
              <div className='flex flex-row gap-2 overflow-x-scroll'>
                {item.imageList?.map((imageURI, index) => {
                  return (
                    <img
                      key={index}
                      src={`${SERVER_IMAGE_URL}${imageURI}`}
                      className='w-[5.5rem] h-[5.5rem] rounded-sm border'
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <CustomTagBlock spreadValues={tagList[index]} />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className='flex flex-col gap-6'>{getItemCard(props.cardData)}</div>
  );
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
