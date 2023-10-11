import { Delete, Edit, List, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDialog from "../Pages/CreatePage/ProfileDialog";
import axios from "axios";
import { getAccessToken } from "../../hooks/apiHook";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../../common/constants";
import ContactList from "../../Deprecated/ContactList";

type MenuItemInfo = {
  content: JSX.Element;
  onClick: () => void;
  style?: React.CSSProperties;
};

type Props = {};

const dropdownMenuStyle = {
  fontSize: "0.8rem",
  py: 0.5,
};

const PlannerOptions = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const plannerId = parseInt(useParams().Id ?? "0");
  const requestURL = `/api/v1/profile/planner`;
  const { data } = useQuery(
    ["plannerInfo", plannerId],
    () =>
      axios.get(`${SERVER_URL}${requestURL}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        withCredentials: true,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const response = data?.data.data;
  return (
    <div>
      <IconButton onClick={handleClick}>
        <List color='secondary' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='text-sm'
        sx={{ py: 0 }}
      >
        <MenuItem sx={dropdownMenuStyle}>
          <ProfileDialog data={response} />
        </MenuItem>
        <MenuItem sx={dropdownMenuStyle}>
          <ContactList />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PlannerOptions;
