import React from "react";
import { arrow_back } from "../../../assets/arrow_back";
import { useLocation, useNavigate } from "react-router-dom";
import { PIVOT_PAGES } from "../../../common/constants";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../../store/viewSlice";

type Props = {};

const arrowButton = (func: () => void) => {
  return (
    <button type='button' onClick={() => func()}>
      <div className='p-2'>{arrow_back}</div>
    </button>
  );
};

const LeftButton = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[1];
  const getFuncByLocation = () => {
    switch (location) {
      case "regist":
        return dispatch(PrevPage());
      default:
        return navigate(-1);
    }
  };
  switch (location) {
    case "":
      return <div className='w-10' />;
    default:
      return arrowButton(getFuncByLocation);
  }
};

export default LeftButton;
