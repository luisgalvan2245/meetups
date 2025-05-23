import 'dotenv/config';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './Shared/infrastructure/Routes/routes';
import swaggerJson from './Shared/infrastructure/Spec/swagger.json';
import { logger } from './Shared/infrastructure/Logger/Logger';
import { ErrorHandlerMiddleware } from './Shared/infrastructure/Middlewares/ErrorHandlerMiddleware';

export function createApp() {
  const app = express();
  app.use(express.json());
  RegisterRoutes(app);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
  app.use(ErrorHandlerMiddleware.handle);
  return app;
}

function startServer(app: Application) {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    logger.warn(`Running on ${process.env.NODE_ENV} mode`);
    logger.info(`Server listening on http://${host}:${port}`);
  });
}

const app = createApp();
startServer(app);
