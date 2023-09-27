import React from "react";
import MasonryImage from "../../../Modules/MasonryImage";
import CustomText from "../../../Modules/CustomText";

type Props = {
  search: string;
};

const SearchFeed = (props: Props) => {
  const { search } = props;
  return (
    <div className='px-4'>
      <div className='py-3'>
        <CustomText type='Title-large' text='피드' />
      </div>
      <MasonryImage search={search} />
    </div>
  );
};

export default SearchFeed;
