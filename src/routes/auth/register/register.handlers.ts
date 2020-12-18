import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { ControllerMap } from '../../../types/api';
import { HttpResponse } from '../../../types/HttpResponse';
import { sendEmail } from '../../../utils/sendEmail';

export const registration: ControllerMap = {};

registration.post = async (req, res, next) => {
  sign(
    { ...req.body },
    env.JWT_ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' },
    async (err, token) => {
      if (err) next(err);
      else {
        sendEmail(
          req.body,
          'Verification email',
          `<p class="email-body">Please verify your email address!</p>
           <a href="http://localhost:${env.PORT}/auth/confirm/${token}" class="btn btn-primary">Verify</a>`
        )
          .then(() =>
            res
              .status(HttpResponse.Success.Accepted)
              .json({ message: 'Email has been sent', ok: true })
          )
          .catch((err) => next(err));
      }
    }
  );
};
