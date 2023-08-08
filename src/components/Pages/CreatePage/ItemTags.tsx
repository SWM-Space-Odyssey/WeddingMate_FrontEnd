import React, { useEffect, useState } from "react";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { useFormContext, useWatch } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "../../../common/constants";
import { useQuery } from "@tanstack/react-query";

const ITEM_TAGS = ["비즈", "실크"];

type Props = {
  formState: itemStates;
};
const getTagList = async (category: string) => {
  const response = axios
    .get(`${SERVER_URL}/api/v1/tag/all?category=${category}}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
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
        if (res.data) {
          setSpreadValue(res.data);
          return;
        }
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
