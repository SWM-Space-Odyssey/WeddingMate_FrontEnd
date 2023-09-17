import { Home, Interests, Search, Sms } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { intoView } from "../../store/viewSlice";

type Props = {};

const pageMap: { [key in PageList]: string } = {
  Regist: "/regist",
  LandingPage: "/",
  PortfolioCreate: "/portfolio/create",
  Portfolio: "/portfolio",
  Item: "/item",
  ItemCreate: "/item/create",
  Planner: "/planner",
  Search: "/search",
  Feed: "/feed",
  PlannerMypage: "/plannermypage",
};

const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const [seleceted, setSelected] = useState(0);
  const handleNavigate = (view: PageList) => {
    dispatch(intoView({ view }));
    navigate(`${pageMap[view]}`);
  };

  return (
    <div
      className={`w-full h-14 bottom-0 ${
        location === "/kakaoAuth" ? "hidden" : ""
      }`}
    >
      <BottomNavigation
        showLabels
        value={seleceted}
        onChange={(e, v) => setSelected(v)}
        className='sticky w-full bottom-0'
      >
        <BottomNavigationAction
          onClick={() => handleNavigate("LandingPage")}
          label='홈'
          icon={<Home />}
        />
        <BottomNavigationAction
          onClick={() => handleNavigate("Search")}
          label='검색'
          icon={<Search />}
        />
        <BottomNavigationAction
          onClick={() => handleNavigate("LandingPage")}
          label='웨딩톡'
          icon={<Sms />}
        />
        <BottomNavigationAction
          onClick={() => handleNavigate("PlannerMypage")}
          label='마이웨딩'
          icon={<Interests />}
        />
      </BottomNavigation>
      <div className='h-full'></div>
    </div>
  );
};

export default NavBar;
