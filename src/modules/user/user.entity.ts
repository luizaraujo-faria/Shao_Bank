import { Exclude } from 'class-transformer';
import {
  //   IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export default class User {
  @IsNumber()
  @IsNotEmpty({ message: 'ID de usuário é obrigatório!' })
  id: number;

  @IsString({ message: 'O nome deve ser um texto válido!' })
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  @Length(2, 100)
  userName: string;

  @IsString({ message: 'Email deve ser um texto válido!' })
  @IsEmail({}, { message: 'Insira um email válido!' })
  @MaxLength(100, { message: 'Email deve conter no máximo 100 caractéres!' })
  @IsNotEmpty({ message: 'Email é obrigatório!' })
  email: string;

  @Exclude()
  @IsString({ message: 'Senha deve ser um texto válido!' })
  @Length(8, 150, { message: 'Senha deve conter no mínimo 8 caractéres!' })
  @IsNotEmpty({ message: 'Senha é obrigatória!' })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message: 'A senha deve conter Maiusculos, números e símbolos!',
    },
  )
  userPassword: string;

  @IsNotEmpty()
  @Exclude()
  createdAt: Date | null;
}
