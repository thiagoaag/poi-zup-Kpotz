import app from './index.js';
import config from './configs/config';
import request from 'supertest';
import should from 'should';
import chai, { expect } from 'chai';
import poiController from './api/controllers/poi.controller';
import {MongoClient} from 'mongodb';

const pois = [
  {name: "Lanchonete", coordinates: [27, 12]},
  {name: "Posto", coordinates: [31, 18]},
  {name: "Joalheria", coordinates: [15, 12]},
  {name: "Floricultura", coordinates: [19, 21]},
  {name: "Pub", coordinates: [12, 8]},
  {name: "Supermercado", coordinates: [23, 6]},
  {name: "Churrascaria", coordinates: [28, 2]}
]

before(function (done) {
  var database;
  const uri = config.mongo.uri;
  MongoClient.connect(uri, { useNewUrlParser: true }, (err,client) => {
    database = client.db('zupdb').collection('pois');
    database.deleteMany();
    database.insertMany(pois, (err) => {
      if (err) return console.log(err);
      console.log("Test POIs Added");
      done(err);
    })
  })
});

describe("Unit tests Zup POIs",function(){
  const validePoi = {
    name: "OK Coordinates",
    coordinates: [100, 100]
  }

  it('Find all POIs', (done) => {
    request(app)
      .get('/zupois/find')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done(err);
      });
  });

  it('Add a valide POI', (done) => {
    request(app)
      .post('/zupois/add')
      .send(validePoi)
      .expect(200)
      .end((err, res) => {
        expect(res.body);
        done(err);
      });
  });

  var invalidePoiName = {
    name: "",
    coordinates: [100, 100]
  }
  var invalidePoiXgt = {
    name: "Coordenada inválida X",
    coordinates: [181, 100]
  }
  var invalidePoiXlt = {
    name: "Coordenada inválida X",
    coordinates: [-1, 100]
  }
  var invalidePoiXnull = {
    name: "Coordenada inválida X",
    coordinates: [null, 100]
  }
  var invalidePoiXstring = {
    name: "Coordenada inválida X",
    coordinates: ["a", 100]
  }
  var invalidePoiYgt = {
    name: "Coordenada inválida Y",
    coordinates: [100, 181]
  }
  var invalidePoiYlt = {
    name: "Coordenada inválida Y",
    coordinates: [100, -1]
  }
  var invalidePoiYnull = {
    name: "Coordenada inválida Y",
    coordinates: [100, null]
  }
  var invalidePoiYstring = {
    name: "Coordenada inválida Y",
    coordinates: [100, "a"]
  }
  var invalidePoiAll ={
    name: null,
    coordinates: [null, "x"]
  }
  //Add a POI
  it('Add a invalide POI: name', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiName)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // --- x ---
  it('Add a invalide POI: x GT', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiXgt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Add a invalide POI: x LT', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiXlt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Add a invalide POI: x NULL', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiXnull)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Add a invalide POI: x String', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiXstring)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // --- y ---
  it('Add a invalide POI: y GT', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiYgt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Add a invalide POI: y LT', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiYlt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Add a invalide POI: y NULL', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiYnull)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Add a invalide POI: y String', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiYstring)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // --- all ---
  it('Add a invalide POI: all', (done) => {
    request(app)
      .post('/zupois/add')
      .send(invalidePoiAll)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  var validePoiNear = {
    x: 20,
    y: 10,
    max_distance: 10
  }
  var invalidePoiNearXgt = {
    x: 181,
    y: 10,
    max_distance: 10
  }
  var invalidePoiNearXlt = {
    x: -1,
    y: 10,
    max_distance: 10
  }
  var invalidePoiNearXnull = {
    x: null,
    y: 10,
    max_distance: 10
  }
  var invalidePoiNearXstring = {
    x: "a",
    y: 10,
    max_distance: 10
  }
  var invalidePoiNearYgt = {
    x: 20,
    y: 181,
    max_distance: 10
  }
  var invalidePoiNearYlt = {
    x: 20,
    y: -1,
    max_distance: 10
  }
  var invalidePoiNearYnull = {
    x: 20,
    y: null,
    max_distance: 10
  }
  var invalidePoiNearYstring = {
    x: 20,
    y: "a",
    max_distance: 10
  }
  var invalidePoiNearMDlt = {
    x: 20,
    y: 10,
    max_distance: -1
  }
  var invalidePoiNearMDnull = {
    x: 20,
    y: 10,
    max_distance: null
  }
  var invalidePoiNearMDstring = {
    x: 20,
    y: 10,
    max_distance: "a"
  }
  var invalidePoiNearAll = {
    x: -10,
    y: "a",
    max_distance: null
  }
  // find near
  // -- x --
  it('Find near POI invalide: x GT', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearXgt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: x LT', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearXlt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: x NULL', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearXnull)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: x String', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearXstring)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // -- y --
  it('Find near POI invalide: y GT', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearYgt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: y LT', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearYlt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: y NULL', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearYnull)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: y String', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearYstring)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // --- max_distance ---
  it('Find near POI invalide: max_distance LT', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearMDlt)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: max_distance NULL', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearMDnull)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  it('Find near POI invalide: max_distance String', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearMDstring)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // --- all ---
  it('Find near POI invalide: all', (done) => {
    request(app)
      .post('/zupois/find')
      .send(invalidePoiNearAll)
      .expect(400)
      .end((err, res) => {
        expect(err);
        done(err);
      });
  });
  // --- requisite ----
  it(`Find near POI: x=${validePoiNear.x}; y=${validePoiNear.y}; max_distance=${validePoiNear.max_distance}`, (done) => {
    request(app)
      .post('/zupois/find')
      .send(validePoiNear)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done(err);
        console.log(res.body);
      });
  });
});
