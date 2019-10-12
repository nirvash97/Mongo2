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
app.post('/pokemons',(req,res) => {
    client.connect((err,client) => {
        if(err){
            console.log(err)
            res.status(500).send({error: err})
            return 
        }
        let db = client.db(database)
        db.collection(collection).insertOne({ name : 'Raijuu', Type: ' Lightning'} , (err,result) => {
            res.status(201).send({message : 'Create Pokemon Complete'})
            return
        })
    })
})

app.get('/airbnb/list',(req,res) => {
    client.connect((err,client) => {
        if(err){
            console.log(err)
            res.sendStatus(500).send({error: err})
            return 
        }
        let db = client.db(database2)
         db.collection(collection2).find({}).limit(10).toArray((err,result) => {
            res.send(result)
        })
    })
})

app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`)) // start server