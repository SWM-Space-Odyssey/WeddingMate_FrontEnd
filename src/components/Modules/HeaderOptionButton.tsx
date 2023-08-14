import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type MenuItemInfo = {
  content: JSX.Element;
  onClick: () => void;
  style?: React.CSSProperties;
};

type Props = {
  data: {
    menuItems: MenuItemInfo[];
    dropDownMenuStyle?: React.CSSProperties;
  };
};

const HeaderOptionButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!props.data) return <></>;
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='text-sm'
        sx={{ py: 0 }}
      >
        {props.data.menuItems.map((item, index) => {
          return (
            <MenuItem
              sx={props.data.dropDownMenuStyle}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
              key={index}
            >
              {item.content}
            </MenuItem>
          );
        })}
        {/* <MenuItem sx={props.data.dropDownMenuStyle}>
          <Edit sx={dropdownIconStyle} />
          포트폴리오 수정하기
        </MenuItem> */}
        {/* <MenuItem sx={props.data.dropDownMenuStyle} onClick={() => deleteHandler()}>
            <Delete sx={dropdownIconStyle} />
            포트폴리오 삭제하기
          </MenuItem> */}
      </Menu>
    </div>
  );
};

export default HeaderOptionButton;
