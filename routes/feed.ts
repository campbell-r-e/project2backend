import { Router, Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { getalldata_by_user, login } from '../controllers/feed.js';

const router = Router();

router.get('/alldata', getalldata_by_user as RequestHandler);
router.post('/login', login as RequestHandler);

export default router;