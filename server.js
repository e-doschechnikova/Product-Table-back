const express = require('express');
const {v1: uuidv1} = require('uuid');
const bodyParser = require('body-parser')
const app = express();
const port = 3000
const jsonParser = bodyParser.json()

let documents1 = [
    {
        "name": "Perry",
        "quantity": 36958,
        "deliveryDate": new Date(),
        "price": "829.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Robyn",
        "quantity": 32382,
        "deliveryDate": new Date(),
        "price": "905.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Nathan",
        "quantity": 83760,
        "deliveryDate": new Date(),
        "price": "908.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Tiara",
        "quantity": 82695,
        "deliveryDate": new Date(),
        "price": "873.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Maya",
        "quantity": 83638,
        "deliveryDate": new Date(),
        "price": "266.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Tia",
        "quantity": 64360,
        "deliveryDate": new Date(new Date() - Math.random()*(1e+12)),
        "price": "995.00",
        "currency": 'RUB',
        "id": uuidv1()
    }
];

let documents2 = [
    {
        "name": "Kianna",
        "quantity": 49498,
        "deliveryDate": new Date(),
        "price": "283.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Rollin",
        "quantity": 21605,
        "deliveryDate": new Date(),
        "price": "856.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Roslyn",
        "quantity": 99657,
        "deliveryDate": new Date(new Date() - Math.random()*(1e+12)),
        "price": "238.00",
        "currency": 'RUB',
        "id": uuidv1()
    },
    {
        "name": "Alphonso",
        "quantity": 83824,
        "deliveryDate": new Date(),
        "price": "434.00",
        "currency": 'USD',
        "id": uuidv1()
    },
    {
        "name": "Prudence",
        "quantity": 26363,
        "deliveryDate": new Date(new Date() - Math.random()*(1e+12)),
        "price": "964.00",
        "currency": 'RUB',
        "id": uuidv1()
    }
];

let canceledIds = [];
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/documents1', (req, res) => {
    res.json(documents1.filter((doc) => !canceledIds.includes(doc.id)));
});

app.get('/documents2', (req, res) => {
    res.json(documents2.filter((doc) => !canceledIds.includes(doc.id)));
});

app.post('/cancel', jsonParser, (req, res) => {
    const {ids} = req.body;
    canceledIds = [...canceledIds, ...ids];
    res.json({message: 'Ids canceled successfully'});
});

app.get("/clear", (req, res) => {
    canceledIds = [];
    res.json({message: "Ids cleared"});
});

app.listen(port, () => {
    console.log('Server started on port 3000');
});