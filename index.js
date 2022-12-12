const express = require("express");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.USERPASS}@cluster0.tlsofwm.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const projectsCollection = client.db('portfolioDB').collection('projects');

    app.get('/projects', async(req, res) => {
        const query = {}
        const cursor =await projectsCollection.find(query).toArray();
        res.send(cursor)
    })

    app.get('/projects/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id)}
        const cursor = await projectsCollection.findOne(query)
        res.send(cursor)
    })
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('portfolio server was running ')
})

app.listen(port, () => {console.log(`app running port is: ${port}` )})