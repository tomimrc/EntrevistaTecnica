const dataJson = require("../data.json")
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


app.use(express.json());

let data = dataJson
app.get('/customer', (req, res) => {
    res.json(dataJson);} )

app.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    const customer = data.find(c => c.id === parseInt(id));
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).send({ message: "Customer not found" });
    }
});

app.post('/customer', (req, res) => {
    const newCustomer = req.body;
    if (!newCustomer.first_name || !newCustomer.last_name || !newCustomer.email) {
        return res.status(400).send({ message: "All fields are required" });
    }
    newCustomer.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    // O puedes mapear los nombres de los campos antes de agregar al array de datos
    data.push({
        id: newCustomer.id,
        first_name: newCustomer.first_name,
        last_name: newCustomer.last_name,
        email: newCustomer.email,
        gender: newCustomer.gender,
        ip_address: newCustomer.ip_address,
        country: newCustomer.country,
    });
    res.status(201).send(newCustomer);
});

app.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const index = data.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
        const updatedCustomer = { ...data[index], ...req.body };
        data[index] = updatedCustomer;
        res.send(updatedCustomer);
    } else {
        res.status(404).send({ message: "Customer not found" });
    }
});

app.delete('/customer/:id', (req, res) => {
    const { id } = req.params;
    const index = data.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
        const deletedCustomer = data.splice(index, 1);
        res.send(deletedCustomer);
    } else {
        res.status(404).send({ message: "Customer not found" });
    }
});

app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
});
