import React, { useEffect, useState } from "react";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { useFormContext, useWatch } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "../../../common/constants";
import { useQuery } from "@tanstack/react-query";
import { getTagList } from "../../../api/Item";

const ITEM_TAGS = ["비즈", "실크"];

type Props = {
  formState: itemStates;
};

const ItemTags = (props: Props) => {
  const [spreadValues, setSpreadValue] = useState<string[]>([]);
  const formState = props.formState;
  const { control } = useFormContext();
  const contentText = useWatch({
    control: control,
    name: "categoryContentText",
  });
  const content = useWatch({
    control: control,
    name: "categoryContent",
  });

  useEffect(() => {
    if (content) {
      getTagList(content).then((res) => {
        if (
          res.status === "SUCCESS" &&
          res.data.typeTag === "itemTag" &&
          res.data.tagList
        ) {
          setSpreadValue(res.data.tagList);
          return;
        }
        // 현재 DB 에 저장된 태그리스트가 없어서 목데이터 보여줄 겸 이렇게 해두었음
        setSpreadValue(ITEM_TAGS);
      });
    }
  }, [contentText, content]);

  return (
    <div>
      <CustomTagBlock
        spreadValues={spreadValues}
        formState={formState}
        title='아이템 태그'
        isAddable={true}
      />
    </div>
  );
};

export default ItemTags;
