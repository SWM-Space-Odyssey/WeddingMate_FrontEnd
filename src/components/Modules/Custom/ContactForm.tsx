import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Settings, Sms } from "@mui/icons-material";
import CustomInput from "./CustomInput";

type Props = {};
type contactForm = {
  // plannerId: string;
  contact: string;
  message: string;
};
const messageContent = {
  state: "message" as const,
  title: "메세지",
  placeholder: "10자 이상 입력해주세요",
  required: true,
};
const contactContent = {
  state: "contact" as const,
  title: "연락처",
  placeholder: "010-1234-5678",
  required: true,
};
const ContactForm = (props: Props) => {
  const methods = useForm<contactForm>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const error = methods.formState.errors;
  const snackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const validChecker = (data: contactForm) => {
    const { contact, message } = data;
    if (contact.split("-").length !== 3 || message.length < 10) {
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const handleClose = (submit?: boolean) => {
    if (submit) return setOpen(false);
    if (confirm("정말로 닫으시겠습니까?")) setOpen(false);
  };
  const onInvalid = (errors: any) => console.error(errors);
  const onSubmit: SubmitHandler<contactForm> = async (data) => {
    const isValid = validChecker(data);
    const { contact, message } = data;
    if (!isValid) return;
    const body = {
      contact,
      message,
    };
    handleClose(true);
    // const response = await editPlannerProfile(body);
    // if (response.status === 200 && response.data.status === "SUCCESS") {
    //   alert("회원정보가 수정되었습니다.");
    //   navigate(0);
    // } else {
    //   alert("회원정보 수정에 실패하였습니다.");
    // }
  };

  return (
    <>
      <IconButton
        size='small'
        color='primary'
        onClick={handleClickOpen}
        sx={{ p: 0.5, border: "2px solid", bgcolor: "white" }}
      >
        <div className='flex flex-col items-center p-1 aspect-square justify-center'>
          <Sms color='primary' />
          <div className='text-xs'>상담문의</div>
        </div>
      </IconButton>
      <Dialog open={open} scroll='paper' onClose={() => handleClose()}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
            <DialogTitle className='sticky'>상담문의</DialogTitle>
            <div>
              <DialogContent>
                <div className='flex flex-col gap-2 w-64'>
                  <CustomInput required content={messageContent} />
                  <CustomInput required content={contactContent} />
                </div>
              </DialogContent>
            </div>
            <DialogActions>
              <Button
                type='button'
                variant='outlined'
                onClick={() => handleClose()}
              >
                취소
              </Button>
              <Button variant='contained' type='submit' sx={{ color: "white" }}>
                보내기
              </Button>
            </DialogActions>
            <Snackbar
              open={snackbarOpen}
              onClose={snackbarClose}
              autoHideDuration={1500}
            >
              <Alert severity='error'>입력항목을 확인해주세요 !</Alert>
            </Snackbar>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ContactForm;
