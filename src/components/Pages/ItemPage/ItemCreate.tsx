import React from "react";
import ItemCategories from "./subComponent/ItemCategories";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../../Modules/ImageUpload";
import ItemTags from "./subComponent/ItemTags";
import CustomInput from "../../Modules/CustumInput";
import CustomDatePicker from "../../Modules/CustomDatePicker";
import CustomButton from "../../Modules/CustomButton";

type Props = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  adjust?: itemRegister;
};
interface itemRegister {
  categoryContent: string;
  itemTagList: string[];
  itemRecord: string;
  pictures?: string[];
  date?: string;
  company?: string;
}

const ItemCreate = (props: Props) => {
  const methods = useForm<itemRegister>({});
  const setClose = () => {
    console.log("setC : ", methods.watch());
    props.close(false);
  };
  const onSubmit: SubmitHandler<itemRegister> = (data) => {
    console.log(data);
  };
  // if props.adjust is not null, setValue all of them
  // if (props.adjust) {
  //   const { adjust } = props;
  //   const { setValue } = methods;
  //   const {
  //     categoryContent,
  //     itemTagList,
  //     itemRecord,
  //     pictures,
  //     date,
  //     company,
  //   } = adjust;
  //   setValue("categoryContent", categoryContent);
  //   setValue("itemTagList", itemTagList);
  //   setValue("itemRecord", itemRecord);
  //   setValue("pictures", pictures);
  //   setValue("date", date);
  //   setValue("company", company);
  // }
  const itemRecord = {
    state: "itemRecord" as const,
    title: "일정 기록",
    placeholder: "일정에 대한 상세한 기록을 작성해주세요",
    multiline: true,
    textCount: true,
  };
  const company = {
    state: "company" as const,
    title: "업체명",
    placeholder: "업체명을 기입해주세요",
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ItemCategories />
        <ImageUpload title='image' maxCount={5} />
        <ItemTags formState='itemTagList' />
        <CustomInput content={itemRecord} />
        <CustomDatePicker state='date' />
        <CustomInput content={company} />
        <CustomButton
          text='아이템 추가'
          flag={false}
          buttonType='submit'
          customFunc={setClose}
        />
      </form>
    </FormProvider>
  );
};

export default ItemCreate;
