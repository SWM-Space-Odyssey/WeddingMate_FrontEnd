import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ReportProblem } from "@mui/icons-material";
import CustomText from "./Custom/CustomText";
import { userReport } from "../../api/user";
const reportReasons = [
  "SPAM",
  "SEXUAL",
  "ILLEGAL",
  "FAKE",
  "INTELLECTUAL_PROPERTY",
  "OTHER",
] as const;
const reportReasonMap = {
  SPAM: "스팸",
  SEXUAL: "성적인 컨텐츠",
  ILLEGAL: "불법적인 컨텐츠",
  FAKE: "가짜 컨텐츠",
  INTELLECTUAL_PROPERTY: "지적재산권 침해",
  OTHER: "기타",
};
type reportItemType = "PORTFOLIO" | "ITEM" | "USER" | null;
type reportReason = (typeof reportReasons)[number];
type Props = {
  body: {
    reportedItemId: number;
    reportItemType: reportItemType;
  };
};
const ReportButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] =
    React.useState<reportReason>("SPAM");
  const reportTargetId = useSelector(
    (state: RootState) => state.user.reportTargetId
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as reportReason);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!reportTargetId) {
      alert("신고 접수에 실패했습니다.");
      setOpen(false);
      return;
    }
    const body = {
      ...props.body,
      reportedUserId: reportTargetId,
      reportReason: selectedValue,
    };
    const response = await userReport(body);
    if (response?.status === "SUCCESS") {
      alert("신고가 접수되었습니다.");
    } else {
      alert("신고 접수에 실패했습니다.");
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <ReportProblem fontSize='small' color='primary' />
      </IconButton>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle fontSize='medium'>신고하기 🚨</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={selectedValue} onChange={handleChange}>
              {reportReasons.map((item, index) => {
                return (
                  <FormControlLabel
                    value={item}
                    control={<Radio />}
                    label={reportReasonMap[item]}
                    key={index}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} size='small'>
            취소
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant='contained'
            size='small'
          >
            제출
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportButton;
