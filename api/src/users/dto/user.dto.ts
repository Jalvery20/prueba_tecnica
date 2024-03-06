import { IsString, Length, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5, 100)
  username: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {
    message:
      'La contraseña debe tener al menos un número, al menos una mayúscula, al menos una minúscula, y tener entre 8 y 20 caracteres',
  })
  password: string;

  @IsEmail()
  @Length(20, 300)
  email: string;
}
