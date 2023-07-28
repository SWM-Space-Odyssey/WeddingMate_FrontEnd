import React from "react";
import CustomTagBlock from "../../../Modules/CustomTagBlock";

const ITEM_TAGS = ["비즈", "실크"];

type Props = {
  formState: itemStates;
};

const ItemTags = (props: Props) => {
  const formState = props.formState;
  return (
    <div>
      <CustomTagBlock
        spreadValues={ITEM_TAGS}
        formState={formState}
        title='아이템 태그'
        isAddable={true}
      />
    </div>
  );
};

export default ItemTags;
