import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send e-mail with password recover intructions', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });
    expect(sendMail).toHaveBeenCalled();
  });

  it('should generate a token for recover password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

  it('should not be able to send e-mail to a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'random-email@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
