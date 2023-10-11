import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setGuide } from "../../../../store/userSlice";
import EventLevel1 from "./EventLevel1";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import EventLevel2 from "./EventLevel2";

type Props = {};

const EventModal = (props: Props) => {
  const guide = useSelector((state: RootState) => state.user.guide);
  if (!guide.portfolio) return <EventLevel1 />;
  if (!guide.item) return <EventLevel2 />;
};

export default EventModal;
