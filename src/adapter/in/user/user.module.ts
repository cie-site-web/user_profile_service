import { Module } from '@nestjs/common';
import { BcryptPasswordHasherAdapter } from '../../out/security/password-hasher.adapter';
import { CreateUserUseCase } from 'src/application/use_case/user/create-user.usecase';
import { CreateUserValidator } from 'src/domain/service/validators/user/create-user.validator';
import { PublicIdGeneratorAdapter } from '../generate.public-id.adapter';

@Module({
  providers: [
    {
      provide: 'UserRepositoryPort',
      useClass: UserRepositoryAdapter,
    },
    {
      provide: 'PasswordHasherPort',
      useClass: BcryptPasswordHasherAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        repo,
        idGenerator,
        hasher,
      ) => {
        return new CreateUserUseCase(
          repo,
          new CreateUserValidator(),
          idGenerator,
          hasher,
        );
      },
      inject: [
        'UserRepositoryPort',
        'PublicIdGeneratorPort',
        'PasswordHasherPort',
      ],
    },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
