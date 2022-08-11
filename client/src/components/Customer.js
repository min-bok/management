import React, { useEffect, useState } from "react";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import CustomerDelete from "./CustomerDelete";
import CustomerUpdate from "./CustomerUpdate";

function Customer(props) {
  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        <img src={props.image} alt="profile" />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.birthday}</TableCell>
      <TableCell>{props.gender}</TableCell>
      <TableCell>{props.job}</TableCell>
      <TableCell>
        <CustomerUpdate stateRefresh={props.stateRefresh} id={props.id} />
      </TableCell>
      <TableCell>
        <CustomerDelete stateRefresh={props.stateRefresh} id={props.id} />
      </TableCell>
    </TableRow>
  );
}

export default Customer;
