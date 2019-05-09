import {MongoClient} from 'mongodb';

const uri = "mongodb+srv://zupuser:zupuser@kpotzdb-4ygp2.mongodb.net/test?retryWrites=true";

let collections = {};

var db = MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    collections.zupdb = client.db('zupdb').collection('pois');
})

export default collections;
