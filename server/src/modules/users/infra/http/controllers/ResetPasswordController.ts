import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

type ICreateBody = {
  password: string;
  token: string;
};

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body as ICreateBody;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({ password, token });
    return response.status(204).send();
  }
}
