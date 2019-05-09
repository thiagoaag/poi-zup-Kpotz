import db from '../models/poi.model';

function add(req, res){
  db.zupdb.insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    res.send("Success: POI added.");

  })
}

function findAll(req, res){
  db.zupdb.find().toArray((err, results) => {
      if (err) return console.log(err);

      res.send(results);
  })
}

function findNear(req, res){
  var poi_coordinate = req.body;

  db.zupdb.find({
    coordinates: {
      $geoWithin: {
        $center: [[poi_coordinate.x, poi_coordinate.y], poi_coordinate.max_distance],
      },
    },
  }).toArray((err,results) => {
    if(err) return console.log(err);

    res.send(results);
  })
}

export default {add, findAll, findNear};
