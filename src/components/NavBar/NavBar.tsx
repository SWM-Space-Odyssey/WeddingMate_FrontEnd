import {
  Favorite,
  Groups,
  Home,
  Interests,
  Search,
  Sms,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { intoView } from "../../store/viewSlice";
import { PIVOT_PAGES } from "../../common/constants";
import ChannelService from "../../hooks/ChannelService";

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
  Community: "/community",
  Like: "/like",
  PlannerMypage: "/mypage",
};
const channelButtonShow = () => {
  ChannelService.showChannelButton();
};
const channelButtonHide = () => {
  ChannelService.hideChannelButton();
};

const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const subLocation = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const [seleceted, setSelected] = useState(0);
  const handleNavigate = (view: PageList) => {
    dispatch(intoView({ view }));
    navigate(`${pageMap[view]}`);
  };
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (PIVOT_PAGES.includes(location)) {
      if (location === "mypage" && subLocation === "setting") {
        setVisible(false);
      } else {
        setVisible(true);
      }
    } else {
      setVisible(false);
    }
    switch (location) {
      case "":
        setSelected(0);
        break;
      case "search":
        setSelected(1);
        break;
      case "like":
        setSelected(2);
        break;
      case "community":
        setSelected(3);
        break;
      case "mypage":
        setSelected(4);
        break;
      default:
        break;
    }
  }, [location, subLocation]);

  useEffect(() => {
    if (visible) channelButtonShow();
    else channelButtonHide();
  }, [visible]);

  return (
    <div
      className={`w-full h-14 bottom-0 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] ${
        visible ? "" : "hidden"
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
          onClick={() => handleNavigate("Like")}
          label='찜'
          icon={<Favorite />}
        />
        <BottomNavigationAction
          onClick={() => handleNavigate("Community")}
          label='커뮤니티'
          icon={<Groups />}
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
