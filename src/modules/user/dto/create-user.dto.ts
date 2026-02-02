import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export default class CreateUser {
  @IsString({ message: 'O nome deve ser um texto válido!' })
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  @Length(2, 100, { message: 'Nome deve conter no mínimo 2 caractéres!' })
  userName: string;

  @IsString({ message: 'Email deve ser um texto válido!' })
  @IsEmail({}, { message: 'Insira um email válido!' })
  @MaxLength(100, { message: 'Email deve conter no máximo 100 caractéres!' })
  @IsNotEmpty({ message: 'Email é obrigatório!' })
  email: string;

  @IsString({ message: 'Senha deve ser um texto válido!' })
  @Length(8, 150, { message: 'Senha deve conter no mínimo 8 caractéres!' })
  @IsNotEmpty({ message: 'Senha é obrigatória!' })
  @IsStrongPassword(
    {
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve conter Maiúsculos, Minúsculos, números e símbolos!',
    },
  )
  userPassword: string;
}
