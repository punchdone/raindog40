import {
  TableRow,
  TableCell,
  Button
} from '@mui/material';

// import RoomItem from "./RoomItem";

import roomPad from '../../helpers/roomPad';
const ProjectItem = ({ project, room, orderClick }) => {

  return (
    <TableRow sx={{ "&: last-child td, & last-child th": { border: 0 } }}>
      <TableCell component='th' scope='row'>
        1{project.woProjectNum}-{roomPad(room.roomNum)}
      </TableCell>
      <TableCell>{project.dealerCode}/{project.projectName} (#{project._id})</TableCell>
                    {/* {console.log(await channelCodeLookup(project.dealerCode))} */}
      <TableCell>{room.roomName} (#{room._id})</TableCell>
      <TableCell>{room.orderType}</TableCell>
      <TableCell>{room.status}</TableCell>
      <TableCell>productLine</TableCell>
      <TableCell>{room.order}</TableCell>
      <TableCell>
        <Button variant="outlined" id={room.order} onClick={orderClick}>Order</Button>
      </TableCell>
    </TableRow>
  );
}

export default ProjectItem;
