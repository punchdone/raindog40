import MaterialTable from "material-table";
import { forwardRef } from 'react';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { ArrowLeft } from "@material-ui/icons";


function BackorderTable(props) {

  // const [session, loading] = useSession();

  // console.log(session);

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

  const columns = [
    { title: "Date", field: "date" },
    { title: "PO#", field: "po" },
    { title: "Project Name", field: "name" },
    { title: "Item", field: "item" },
    { title: "Quantity", field: "quantity" },
    { title: "Shipped", field: "shipped" },
    { title: "Received", field: "received" },
    { title: "Notes", field: "notes" },
  ];

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={columns}
        data={props.backorders}
        title="Backorders"
        icons={tableIcons}
        // editable={{
        //     isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
        //     isEditHidden: rowData => rowData.name === 'x',
        //     isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
        //     isDeleteHidden: rowData => rowData.name === 'y',
        //     onBulkUpdate: changes => 
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 /* setData([...data, newData]); */
    
        //                 resolve();
        //             }, 1000);
        //         }),
        //     onRowAddCancelled: rowData => console.log('Row adding cancelled'),
        //     onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
        //     onRowAdd: newData =>
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 /* setData([...data, newData]); */
    
        //                 resolve();
        //             }, 1000);
        //         }),
        //     onRowUpdate: (newData, oldData) =>
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 const dataUpdate = [...data];
        //                 const index = oldData.tableData.id;
        //                 dataUpdate[index] = newData;
        //                 setData([...dataUpdate]);
    
        //                 resolve();
        //             }, 1000);
        //         }),
        //     onRowDelete: oldData =>
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 const dataDelete = [...data];
        //                 const index = oldData.tableData.id;
        //                 dataDelete.splice(index, 1);
        //                 setData([...dataDelete]);
    
        //                 resolve();
        //             }, 1000);
        //         })
        // }}
      />
    </div>
  );
}

export default BackorderTable;
