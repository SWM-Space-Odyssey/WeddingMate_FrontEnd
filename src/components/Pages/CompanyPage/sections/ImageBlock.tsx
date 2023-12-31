import React, { useState } from "react";
import SectionHeader from "../../../Modules/SectionHeader";
import { Button, Modal } from "@mui/material";
import { PROGRESSIVE_IMAGE_URL } from "../../../../common/constants";

type Props = { image: string[] };
const dummyImgURL = PROGRESSIVE_IMAGE_URL + "userPolicy/icon.png";

const ImageBlock = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(dummyImgURL);
  const handleOpen = (src: string) => {
    setImgSrc(src);
    setOpen(true);
  };
  const ImageElement = (props: { src: string }) => {
    return (
      <img
        src={props.src}
        alt=''
        className='w-[33%] object-cover aspect-square'
        onClick={() => handleOpen(props.src)}
      />
    );
  };
  return (
    <div className='flex flex-col'>
      <Modal
        className='flex justify-center items-center'
        open={open}
        onClose={() => setOpen(false)}
        sx={{ width: "100%" }}
      >
        <div className='flex min-w-[375px] max-w-[516px] justify-center items-center bg-white/5'>
          <img src={`${imgSrc}`} alt='image-modalOpen' />
        </div>
      </Modal>
      <div className='py-2.5 px-4'>
        <SectionHeader title='사진' />
      </div>
      {props.image.length > 0 && (
        <div className='flex flex-1 flex-wrap gap-[1px] px-[0.5%]'>
          {props.image.map((src, index) =>
            index < 9 ? (
              <ImageElement key={index} src={PROGRESSIVE_IMAGE_URL + src} />
            ) : (
              <></>
            )
          )}
        </div>
      )}
      {props.image.length === 0 && (
        <div className='px-4 flex flex-col justify-center items-center text-lg'>
          아직 등록된 사진이 없어요
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
