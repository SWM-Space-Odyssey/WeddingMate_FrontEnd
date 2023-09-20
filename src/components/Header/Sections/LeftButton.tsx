import React from "react";
import { arrow_back } from "../../../assets/arrow_back";
import { useLocation, useNavigate } from "react-router-dom";
import { PIVOT_PAGES } from "../../../common/constants";

type Props = {};

const arrowButton = (func: () => void) => {
  return (
    <button type='button' onClick={() => func()}>
      <div>{arrow_back}</div>
    </button>
  );
};

const LeftButton = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const getFuncByLocation = () => {
    console.log(location);
    switch (location) {
      case "":
        return;
      default:
        return navigate(-1);
    }
  };
  switch (location) {
    case "":
      return;
    default:
      return arrowButton(getFuncByLocation);
  }
};

export default LeftButton;
