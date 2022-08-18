import React from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
// import axios from "axios";
import { useState } from "react";
import API from "../modules/API";

function CustomerDelete(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCustomer = async (id) => {
    const url = "/api/customers/" + id;
    await API._delete(url);
    props.stateRefresh();
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              deleteCustomer(props.id);
            }}
          >
            삭제
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerDelete;
