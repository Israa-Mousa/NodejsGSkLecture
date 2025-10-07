import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { SuccessApiResponse, UnsuccessfulApiResponse } from '../../middlewares/response.middleware';
export class UserController {
  private _userService =  userService;

  getUsers = (
    req: Request<{}, {}, {}, { page: string; limit: string }>,
    res: Response<SuccessApiResponse | UnsuccessfulApiResponse>
  ) => {
    const page = Number(req.query.page)|| 1;
    const limit = Number(req.query.limit)|| 10;
    const users = this._userService.getUsers(page, limit);
    //res.json(users);
    res.ok(users);
  };

  getUser = (req: Request<{ uid: string }>, res: Response) => {
    const id = req.params.uid;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const user = this._userService.getUser(Number(id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.ok(user);
    //res.json(user);
  };

  createUser = (req: Request, res: Response) => {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    const { name, email, password } = req.body;
    console.log('Uploaded file info:');
    console.log(req.file);
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = this._userService.createUser(name, email, password, avatar);
   // res.status(201).json(user);
    res.create(user);
  };

  updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const { name, email } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = this._userService.updateUser(Number(id), name, email, avatar);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //res.json(user);
    res.create(user);
  };

  deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const deleted = this._userService.deleteUser(Number(id));
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.ok({});
    //res.status(204).send();
  };
}
