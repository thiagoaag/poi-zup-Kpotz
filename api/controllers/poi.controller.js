import {MongoClient} from 'mongodb';
import config from '../../configs/config';

const uri = config.mongo.uri;

function add(req, res){
  var db;
  MongoClient.connect(uri, { useNewUrlParser: true }).then(function(client){
    db = client.db('zupdb').collection('pois');
    db.insertOne(req.body, (err, result) => {
      if (err) return console.log(err);

      res.send("Success: POI added.");
    })
  }).catch(function(err){
    console.log(err);
  })
}

function findAll(req, res){
  var db;
  MongoClient.connect(uri, { useNewUrlParser: true }).then(function(client){
    db = client.db('zupdb').collection('pois');
    db.find().toArray((err, results) => {
      if (err) return console.log(err);

      res.send(results);
    })
  }).catch(function(err){
    console.log(err);
  })
}

function findNear(req, res){
  var db;
  MongoClient.connect(uri, { useNewUrlParser: true }).then(function(client){
    db = client.db('zupdb').collection('pois');
    var poi_coordinate = req.body;
    db.find({
      coordinates: {
        $geoWithin: {
          $center: [[poi_coordinate.x, poi_coordinate.y], poi_coordinate.max_distance],
        },
      },
    }).toArray((err,results) => {
      if(err) return console.log(err);

      res.send(results);
    })
  }).catch(function(err){
    console.log(err);
  })
}

export default {add, findAll, findNear};
