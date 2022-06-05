import express, {Request, Response, Router} from 'express';
import {WelcomeController} from '../app/Http/Controller/Api/welcomeController';
const welcomeController = new WelcomeController();
const router: Router = express.Router();
router.route('/').all((req: Request, res: Response) => {
    return res.sendStatus(200)
});
router.route('/health-check').all((req: Request, res: Response)=> {
    return res.json({
        ping: 'pong'
    })
});
router.route('/hello').get((req, res) => welcomeController.execute(req, res))
export default router;