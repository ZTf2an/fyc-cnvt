import {Router} from 'express';
import registrosRouter from './registrosRouter.js';

function routerApi(app) {
    const router = Router();
    router.use('/registros',registrosRouter);
    app.use('/api/v1', router);
}

export default routerApi;