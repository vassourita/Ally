import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import { IValidator } from '@validators/IValidator';

export class SessionStoreValidator implements IValidator {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return res.status(400).json({ error: 'Validation fails', message: err.inner });
    }
  }
}
