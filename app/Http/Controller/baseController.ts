import {Request, Response} from 'express';
import logger from '../../../src/utils/logger';
export abstract class BaseController {
    protected abstract executeImpl (req: Request, res: Response): Promise<void| any>;
    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch (error) {
            const Logger = new logger();
            Logger.setLogger('BaseController');
            Logger.error(`error: ${error}`)
        }
    }
}