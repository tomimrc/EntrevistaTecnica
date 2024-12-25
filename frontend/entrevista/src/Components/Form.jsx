import React, { useState } from 'react'
import api from '../services/api';


export const Form = ({setData,data} ) => {

    const [datos, setDatos] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        ip_address: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

                const length = await api.get("/customer",data)
                const response = await api.post("/customer", datos);
                const nuevoUsuario = {id:length.data.length +1, ...response.data};
    
                setData([...data, nuevoUsuario]);
              

            setDatos({
                first_name: "",
                last_name: "",
                email: "",
                gender: "",
                ip_address: "",
                country: "",
            });
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
    <>
    <form action="submit" id='form' className='form' onSubmit={handleSubmit}>

        <div>
            <label htmlFor="FirstName">First Name</label>
            <input type="text" id='firstName' name='first_name' value = {datos.first_name} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="LastName">Last Name</label>
            <input type="text" id='lastName' name='last_name' value = {datos.last_name} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="Email">Email</label>
            <input type="email" id='email' name='email' value = {datos.email} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="Gender">Gender</label>
            <input type="text" id='gender' name='gender' value = {datos.gender} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="IpAddress ">Ip Address</label>
            <input type="text" id='ipAddress' name='ip_address' value = {datos.ip_address} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="Country">Country</label>
            <input type="text" id='country' name='country' value = {datos.country} onChange={handleChange}/>
        </div>

        <button type="submit">Enviar</button>
    </form>
    </>
)
}
