import app from './server';
import config from './configs/config';

if (!module.parent) {
  app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
  })
}

export default app;
