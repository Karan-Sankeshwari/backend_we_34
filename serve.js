const express = require('express')
const fs = require('fs')
const app = express();
let data = {
    name: "Karanraj",
    email: "karanrajs1998@gmail.com"
};

const { mongo, mongoURL, mongoClient } = require('./dbConfig');


let client = new mongoClient(mongoURL);

app.use(express.json())

app.get('/', async (req, res) => {
    await client.connect();
    try {
        const db = await client.db('test');
        let user = await db.collection('users').find().toArray()
        res.send({
            statusCode: 200,
            users: user
        })
    } catch (error) {
        if (error)
            console.log(error)
        res.send({
            statusCode: 500,
            message: 'internal server error'
        })
    } finally {
        client.close()
    }
})

app.get('/:id', async (req, res) => {
    await client.connect();
    try {
        const db = await client.db('test');
        let user = await db.collection('users').findOne({
            _id: mongo.ObjectId(req.params.id)
        })
        res.send({
            statusCode: 200,
            user
        })
    } catch (error) {
        if (error)
            console.log(error)
        res.send({
            statusCode: 500,
            message: 'internal server error'
        })
    } finally {
        client.close()
    }
})

app.post("/createUser", async (req, res) => {

    await client.connect();
    try {
        const db = await client.db('test');
        let users = await db.collection('users').insertOne(req.body)
        res.send({
            statusCode: 200,
            message: 'user created successfully',
            users
        })
    } catch (error) {
        if (error)
            console.log(error)
        res.send({
            statusCode: 500,
            message: "internal server error"
        })
    } finally {
        client.close()
    }
})

app.put('/:id', async (req, res) => {
    await client.connect();
    try {
        const db = await client.db('test');
        let user = await db.collection('users').updateOne({
            _id: mongo.ObjectId(req.params.id)
        }, {
            $set: {
                email: 'updatedname@gmail.com'
            }
        })
        res.send({
            statusCode: 200,
            user
        })
    } catch (error) {
        if (error)
            console.log(error)
        res.send({
            statusCode: 500,
            message: 'internal server error'
        })
    } finally {
        client.close()
    }
})

app.delete('/:id', async (req, res) => {
    await client.connect();
    try {
        const db = await client.db('test');
        let user = await db.collection('users').deleteOne({
            _id: mongo.ObjectId(req.params.id)
        })
        res.send({
            statusCode: 200,
            user
        })
    } catch (error) {
        if (error)
            console.log(error)
        res.send({
            statusCode: 500,
            message: 'internal server error'
        })
    } finally {
        client.close()
    }
})

app.listen(3000, () => console.log("server running on port 3000"))