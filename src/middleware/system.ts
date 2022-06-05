import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import logger from '../utils/logger';

const app = express()

app.use(helmet());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    const Logger  = new logger();
    Logger.setLogger('system');
    Logger.info(`[${req.method}] ${req.originalUrl}`);
    next();
});

export default app;