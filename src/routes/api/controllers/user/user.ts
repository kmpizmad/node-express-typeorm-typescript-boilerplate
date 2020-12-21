import { Router } from 'express';
import { User } from '../../../../db/models/User';
import { checkCache } from '../../../../middlewares/checkCache';
import { isExistsOn } from '../../../../middlewares/isExists';
import { isPasswordChanged } from '../../../../middlewares';
import { upload } from '../../../../utils/constants';
import { user } from './user.handlers';

export const router = Router();

router.route('/').get(user.get!);
router
  .route('/:id')
  .get(isExistsOn(User), checkCache, user.getOne!)
  .patch(
    isExistsOn(User),
    upload.single('profilePicture'),
    isPasswordChanged,
    user.patchOne!
  )
  .delete(isExistsOn(User), user.deleteOne!);
