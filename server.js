const express = require('express') 
const mongo= require('mongodb')
const port = 3000

const app = express()
const MongoClient = mongo.MongoClient
const MongoURL = 'mongodb+srv://nirvash1997:papth0391@pokemon-cluster-otxxa.gcp.mongodb.net/test?retryWrites=true&w=majority'

const database = 'Pokemondb'
const collection = 'pokemons'
const database2 = 'sample_airbnb'
const collection2 = 'listingsAndReviews'
const client = new MongoClient(MongoURL , {useNewUrlParser :true , useUnifiedTopology : true})
app.use(express.json())
app.post('/pokemons', async(req,res) => {
    let c = await client.connect().catch((err) => {
        console.log('Error occurred when try to connect mongo')
        console.log(err)
        res.status(500).send({error : err})
        return
    })
    let db = c.db(database)
    let r = await db.collection(collection).insertOne({name: 'Magnet'}).catch((err) => {
        console.log('Error to insert pokemon')
        console.log(err)
        res.status(500).send({error : err})
        return
    })
    res.status(201).send({message : 'Create Pokemon Complete'})
    // client.connect((err,client) => {
    //     if(err){
    //         console.log(err)
    //         res.status(500).send({error: err})
    //         return 
    //     }
    //     let db = client.db('Pokemondb')

    //     db.collection('pokemons').insertOne({name: 'Magnet'},(err,r) => {
    //         res.status(201).send({message : 'Create Pokemon Complete'})
    //         return
    //     })

    // })

    // client.connect((err,client) => {
    //     if(err){
    //         console.log(err)
    //         res.status(500).send({error: err})
    //         return 
    //     }
    //     let db = client.db(database)
    //     db.collection(collection).insertOne({ name : 'Raijuu', Type: ' Lightning'} , (err,result) => {
    //         res.status(201).send({message : 'Create Pokemon Complete'})
    //         return
    //     })
    // })
    //res.status(200).send({message : 'Finish Too early'})
})

app.get('/airbnb/list', async(req,res) => {
    let c = await client.connect().catch((err) => {
        console.log('Error occurred when try to connect mongo')
        console.log(err)
        res.status(500).send({error : err})
        return
    })
    let db = c.db(database2)
    let r = await db.collection(collection2).find({}).limit(10).toArray().catch((err) => {
        console.log('Error to insert pokemon')
        console.log(err)
        res.status(500).send({error : err})
        return
    })
    res.send(r)

})

app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`)) // start server