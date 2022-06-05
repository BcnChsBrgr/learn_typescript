import express from 'express';
import logger from './utils/logger';
import api from '../routes/api';
import config from 'config';
import middleware from '../src/middleware/system';

const PORT = config.get<number>('port') | 3000;

const app = express();

app.use(middleware);
app.use('/api', api);

app.listen(PORT, () => {
    const Logger = new logger();
    Logger.info(`Application running at port ${PORT}`);
});
