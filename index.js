import app from './server';
import {MongoClient} from 'mongodb';
import config from './configs/config';

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
})

export default app;
