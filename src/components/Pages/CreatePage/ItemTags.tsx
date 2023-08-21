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

type Props = {
  formState: itemStates;
  required?: boolean;
  initValue?: string[];
};

const ItemTags = (props: Props) => {
  const [spreadValues, setSpreadValue] = useState<string[]>([]);
  const formState = props.formState;
  const { control } = useFormContext();
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
  }, [content]);
  useEffect(() => {
    if (props.initValue) {
      if (content === "드레스") {
        setSpreadValue([...dressTagList]);
      } else if (content === "메이크업") {
        setSpreadValue([...makeupTagList]);
      } else if (content === "스튜디오") {
        setSpreadValue([...studioTagList]);
      }

      // setSpreadValue([...spreadValues, ...props.initValue]);
    }
  }, [props.initValue]);
  return (
    <div>
      <CustomTagBlock
        spreadValues={spreadValues}
        formState={formState}
        title='아이템 태그'
        maxTag={3}
        required={props.required}
        initValue={props.initValue}
      />
    </div>
  );
};

export default ItemTags;
