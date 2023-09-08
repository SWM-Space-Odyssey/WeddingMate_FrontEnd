import React, { useEffect } from "react";

type Props = {};

const RedirectPage = (props: Props) => {
  useEffect(() => {
    window.location.href = "https://forms.gle/YFDcRNkFJZMtmQtJ6";
  }, []);
  return (
    <div className='loading items-center justify-center w-full h-full'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
  );
};

export default RedirectPage;
