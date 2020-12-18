import { getRepository } from 'typeorm';
import { parse } from 'url';
import { User } from '../../../../db/models/User';
import { ControllerMap } from '../../../../types/api';
import { HttpResponse } from '../../../../types/HttpResponse';
import { apiMessage, ApiResponse } from '../../../../types/message';

export const user: ControllerMap = {};
export const msg = (status: string) => apiMessage('User', status);

// Get
user.get = async (req, res, next) => {
  const query = parse(req.url, true).query || {};

  User.find({ where: { ...query } })
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

// Get One
user.getOne = async (req, res, next) => {
  let code: number = HttpResponse.Error.NotFound;

  User.findOne(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(code);
      next(err);
    });
};

// Patch One
user.patchOne = async (req, res, next) => {
  // Set image if it exists in the 'req' object
  const profilePicture = !!req.file ? req.file.path.replace(/\\/g, '/') : '';
  const patch = !!profilePicture
    ? { ...req.body, profilePicture }
    : { ...req.body };

  let code: number = HttpResponse.Success.Ok;
  let response: ApiResponse = {
    status: 'modified',
  };

  const userRepo = getRepository(User);
  const user = await userRepo.findOne(req.params.id);

  // Update 'User' model directly
  // to run the @BeforeUpdate hook
  Object.keys(patch).forEach((key) => ((user as any)[key] = patch[key]));

  userRepo
    .save(user!)
    .then((user) =>
      res.status(code).json({
        ...response,
        message: msg(response.status),
        data: user,
      })
    )
    .catch((err) => next(err));
};

// Delete One
user.deleteOne = async (req, res, next) => {
  let code: number = HttpResponse.Success.Ok;
  let response: ApiResponse = {
    status: 'deleted',
  };

  User.delete(req.params.id)
    .then((user) => {
      res.status(code).json({
        ...response,
        message: msg(response.status),
        data: user,
      });
    })
    .catch((err) => next(err));
};
