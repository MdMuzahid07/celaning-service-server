const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yof5x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    try {
        
        await client.connect();

        const serviceCollection = client.db('cleaningService').collection('service');


        console.log("MongoDb connected?");

        app.get('service', async(req, res) => {
            
        })



    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', async(req, res) => {
    res.send("Server running?")
});

app.listen(port, () => {
    console.log("Server running on port", port)
}) 