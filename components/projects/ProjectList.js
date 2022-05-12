import { useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

import ProjectItem from "./ProjectItem";
import Order from './orders/Order';

function ProjectList({ projects }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsShown, setModalIsShown] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const orderClickHandler = (e) => {
    console.log(e.target.id);
    setModalIsShown(true);
  };

  return (
    <Fragment>
    {modalIsShown && <Order /> || (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxheight: 440 }}>
        <Table sx={{ minWidth: 650 }} aria-label="production list" stickyheader>
          <TableHead>
            <TableRow>
              <TableCell>Project #</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Room/Spec Group Name</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Product Line</TableCell>
              <TableCell>Order #</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) =>
              project.rooms.map((room) => (
                <ProjectItem
                  project={project}
                  room={room}
                  orderClick={orderClickHandler}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )}
    </Fragment>
  );
}

export default ProjectList;
