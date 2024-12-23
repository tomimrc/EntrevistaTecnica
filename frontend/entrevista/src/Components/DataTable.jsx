import api from "../services/api"
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Form } from "./Form";
// import { Box, Button, Input, TextField } from "@mui/material";



export default function DataTable() {
  const [data,setData] = useState([])
  const paginationModel = { page: 0, pageSize: 5 };
  
  useEffect(() => {
    api.get("/customer")
        .then((response) => {
          console.log("Data fetched", response.data);
          
          setData(response.data)
        
        })
        
        
        .catch((error) => console.error("Error fetching customers:", error));
  }, []);


  useEffect(() => {
    console.log("Data actualizada:", data); // Aquí ves el estado actualizado
}, [data]);


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'First name', width: 130 },
  { field: 'last_name', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    width: 160,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 130,
  },
  {
    field: 'ip_address',
    headerName: 'Ip Adress',
    width: 160,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 160,
  },
];



  return (
      <> 
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
        <Form setData={setData} data={data}  />
      </Paper>
    </>

  )
}


  