import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { deleteLogbookEntry, getalldata_by_user, login, signup } from '../controllers/feed.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();


function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}


router.post('/login', asyncHandler(login));
router.post('/signup', asyncHandler(signup));



router.get('/logbook', verifyToken as RequestHandler, asyncHandler(getalldata_by_user));
router.delete('/logbook/:id',verifyToken as RequestHandler,asyncHandler(deleteLogbookEntry));

export default router;