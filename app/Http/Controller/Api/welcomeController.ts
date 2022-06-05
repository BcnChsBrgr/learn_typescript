import express, {Request, Response, NextFunction, Router} from 'express';
import {BaseController} from '../baseController';

export class WelcomeController extends BaseController {
    public router: Router = express.Router();
    constructor() {
        super();
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        return res.json({hello: 'world'})
    }
}
