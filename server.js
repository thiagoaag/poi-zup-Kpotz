import express from 'express' ;
import bodyParser from 'body-parser';
import routes from './api/routes/poi.route';

const app = express();

app.use(bodyParser.json());

app.use('/zupois', routes);

export default app;
