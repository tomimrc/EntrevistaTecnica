import { useState,useEffect } from 'react'
import DataTable from './Components/DataTable'
import api from './services/api';
import './App.css'

function App() {

const fetchCustomers = async () => {
  try {
    const response = await api.get('/customer');
    console.log('Customer list:', response.data);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};


  useEffect(() => {
    fetchCustomers();
  }, []);



  return (

      <>
        <DataTable  />
      </>
  )

}


export default App
