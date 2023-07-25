import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { CountryList } from "../../../store/CountryLIst";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {};
interface submitBody {
  type: string;
  name: string;
  location: string;
  experience: number;
  date: string;
  company: string;
}

interface SelectWordInterface {
  [key: string]: string;
}

const locationWord: SelectWordInterface = {
  couple: "희망 예식 지역",
  planner: "희망 활동 지역",
};
const typeWord: SelectWordInterface = {
  couple: "예비부부",
  planner: "웨딩플래너",
};

const SelectCountryList: ReactNode[] = CountryList.map((item, index) => {
  return (
    <MenuItem key={`Country${index}`} value={item}>
      {item}
    </MenuItem>
  );
});
const SelectUserTypeList: ReactNode[] = Object.keys(typeWord).map(
  (item, index) => {
    return (
      <MenuItem key={`UserType${index}`} value={item}>
        {typeWord[item]}
      </MenuItem>
    );
  }
);
const MenuItemMaxHeightProps = {
  PaperProps: { style: { maxHeight: "15rem" } },
};

// 더이상 사용되지 않는 Page이지만, 다른 Component 작성할 때 참고용으로 남겨둠

const RegisterPage = (props: Props) => {
  const [userType, setUserType] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userDate, setUserDate] = useState<string>("");
  const [userExperience, setUserExperience] = useState<number>(0);
  const [userCompany, setUserCompany] = useState<string>("");

  const locationLabel = locationWord[userType]
    ? locationWord[userType]
    : "희망 예식 지역";

  const submitFunction = () => {
    let body: submitBody = {
      type: userType,
      name: userName,
      location: userLocation,
      experience: userExperience,
      company: userCompany,
      date: userDate,
    };
    console.log("Body : ", body);
    console.log();
  };
  const handleChangeDate = (date: Date | null) => {
    if (!date) return;
    const dateString = date?.toLocaleString();
    const newDate = new Date(dateString).toLocaleDateString();
    setUserDate(newDate);
  };

  return (
    <Box className='registRoot'>
      <Stack spacing={2}>
        <FormControl>
          <InputLabel>유저타입</InputLabel>
          <Select
            value={userType}
            label='유저타입'
            onChange={(e) => setUserType(e.target.value)}
          >
            {SelectUserTypeList}
          </Select>
        </FormControl>

        <Collapse in={userType === "couple"}>
          <Stack
            spacing={2}
            display={`${userType === "couple" ? "flex" : "none"}`}
          >
            <TextField
              label='이름 / 닉네임'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(event.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label='예식일정'
                format='YYYY/MM/DD'
                closeOnSelect
                onChange={handleChangeDate}
              />
            </LocalizationProvider>
          </Stack>
        </Collapse>
        <Collapse in={userType === "planner"}>
          <Stack
            spacing={2}
            display={`${userType !== "couple" ? "flex" : "none"}`}
          >
            <TextField
              label='경력'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserExperience(Number(event.target.value));
              }}
            />
            <TextField
              label='소속회사'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserCompany(event.target.value);
              }}
            />
          </Stack>
        </Collapse>
        <FormControl className='TESTFORCSKIM'>
          <InputLabel>{locationLabel}</InputLabel>
          <Select
            value={userLocation}
            label={locationLabel}
            onChange={(e) => setUserLocation(e.target.value)}
            MenuProps={MenuItemMaxHeightProps}
          >
            {SelectCountryList}
          </Select>
        </FormControl>
        <Button onClick={() => submitFunction()}>SUBMIT</Button>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
