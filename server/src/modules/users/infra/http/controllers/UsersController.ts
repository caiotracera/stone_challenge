import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

type ICreateBody = {
  username: string;
  email: string;
  password: string;
};

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body as ICreateBody;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      username,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
