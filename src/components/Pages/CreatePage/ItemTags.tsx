import React, { useEffect, useState } from "react";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { useFormContext, useWatch } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "../../../common/constants";
import { useQuery } from "@tanstack/react-query";
import { getTagList } from "../../../api/Item";
import {
  dressTagList,
  makeupTagList,
  studioTagList,
} from "../../../common/TagList";

const ITEM_TAGS = ["비즈", "실크"];

type Props = {
  formState: itemStates;
  required?: boolean;
  initValue?: string[];
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
      if (content === "드레스") {
        setSpreadValue(dressTagList);
      } else if (content === "메이크업") {
        setSpreadValue(makeupTagList);
      } else if (content === "스튜디오") {
        setSpreadValue(studioTagList);
      }
    }
  }, [contentText, content]);
  useEffect(() => {
    if (props.initValue) {
      setSpreadValue([...spreadValues, ...props.initValue]);
    }
  }, [props.initValue]);
  return (
    <div>
      <CustomTagBlock
        spreadValues={spreadValues}
        formState={formState}
        title='아이템 태그'
        isAddable={true}
        maxTag={3}
        required={props.required}
        initValue={props.initValue}
      />
    </div>
  );
};

export default ItemTags;
