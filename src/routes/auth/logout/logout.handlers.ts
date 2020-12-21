import { verify } from 'jsonwebtoken';
import { env } from 'process';
import { userRepo } from '../../../db/repos';
import { ControllerMap } from '../../../types/api';

export const logout: ControllerMap = {};

logout.post = async (req, res, _next) => {
  const token = req.cookies.jid;
  if (!token) {
    res.json({ revokedToken: false });
  } else {
    let payload: any = null;
    try {
      payload = verify(token, env.JWT_REFRESH_TOKEN_SECRET!);
      const user = await (await userRepo()).findOne({ id: payload.userId });
      if (!user) {
        res.json({ revokedToken: false });
      } else {
        await (await userRepo()).increment({ id: user.id }, 'tokenVersion', 1);
        res.clearCookie('jid');
        res.json({ revokedToken: true });
      }
    } catch (err) {
      res.json({ revokedToken: false });
    }
  }
};
