import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Must be atleast 8 characters.' +
        'Must contain atleast 1 lower case letter. ' +
        'Must contain atleast 1 upper case letter. ' +
        'Must contain atleast 1 number' +
        'Must contain atleast 1 symbol',
    },
  )
  password: string;
}
