const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yof5x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    try {

        await client.connect();

        const serviceCollection = client.db('cleaningService').collection('service');


        console.log("MongoDb connected?");

        app.get('/service', async (req, res) => {
            const services = await serviceCollection.find({}).toArray();
            res.send(services)
        })


        app.post('/add-service', async (req, res) => {
            const data = req.body;

            const result = await serviceCollection.insertOne(data);

            res.send(result)
        })


        // to update exists data from database

        app.put('/update-service/:id', async (req, res) => {
            const { id } = req.params;
            const data = req.body;

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: data
            }

            const result = await serviceCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })

        // to delete exists data form databsae

        app.delete('/delete-service/:id', async (req, res) => {
            const { id } = req.params;

            const query = { _id: ObjectId(id) };
            

            const result = await serviceCollection.deleteOne(query)
            res.send(result)
        })



    }
    finally {

    }
}
run().catch(console.dir);




app.get('/', async (req, res) => {
    res.send("Server running?")
});

app.listen(port, () => {
    console.log("Server running on port", port)
}) 