import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import RateItem from './RateItem';

function RateList(props) {
  return (
    <div>
      <Paper sx={{ width: "90%", overlow: "hidden" }}>
        <TableContainer sx={{ maxheight: 440 }}>
          <Table sx={{ minWidth: 200 }}>
            <TableHead>
              <TableRow>
                <TableCell>Rate</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rates.map((rate) => (
                <RateItem rate={rate} uoms={props.uoms} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default RateList;
