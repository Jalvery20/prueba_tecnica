import {
  IsString,
  IsOptional,
  MaxLength,
  IsDateString,
  IsIn,
  IsMongoId,
} from 'class-validator';

export class FindClientDto {
  @IsOptional()
  @IsString()
  identificacion?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  usuarioId: string;
}

export class CreateClientDto {
  @IsString({ message: 'La identificación debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'La identificación no debe exceder los 20 caracteres.' })
  identificacion: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres.' })
  nombre: string;
 
  @IsString({ message: 'Los apellidos deben ser una cadena de texto.' })
  @MaxLength(100, { message: 'Los apellidos no deben exceder los 100 caracteres.' })
  apellidos: string;
 
  @IsString({ message: 'El teléfono celular debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'El teléfono celular no debe exceder los 20 caracteres.' })
  telefonoCelular: string;
 
  @IsString({ message: 'El otro teléfono debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'El otro teléfono no debe exceder los 20 caracteres.' })
  @IsOptional()
  otroTelefono?: string;
 
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(200, { message: 'La dirección no debe exceder los 200 caracteres.' })
  direccion: string;
 
  @IsDateString()
  fNacimiento: string;
 
  @IsDateString()
  fAfiliacion: string;
 
  @IsString({ message: 'El sexo debe ser una cadena de texto.' })
  @MaxLength(1, { message: 'El sexo debe tener un solo carácter.' })
  @IsIn(['F', 'M'], { message: 'El sexo debe ser F o M.' })
  sexo: string;
 
  @IsString({ message: 'La reseña personal debe ser una cadena de texto.' })
  @MaxLength(200, { message: 'La reseña personal no debe exceder los 200 caracteres.' })
  resenaPersonal: string;
 
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @IsOptional()
  imagen?: string;
 
  @IsString({ message: 'El interés debe ser una cadena de texto.' })
  interesFK: string;
 
  @IsString({ message: 'El usuarioId debe ser una cadena de texto.' })
  usuarioId: string;
 }
export class UpdateClientDto {
  @IsMongoId()
  id: string;
  
  @IsString()
  identificacion: string;

  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @MaxLength(100)
  apellidos: string;

  @IsString()
  @MaxLength(20)
  telefonoCelular: string;

  @IsString()
  @MaxLength(20)
  otroTelefono?: string;

  @IsString()
  @MaxLength(200)
  direccion: string;

  @IsDateString()
  fNacimiento: string;

  @IsDateString()
  fAfiliacion: string;

  @IsString()
  @MaxLength(1)
  @IsIn(['F', 'M'])
  sexo: string;

  @IsString()
  @MaxLength(200)
  resenaPersonal: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  interesFK: string;

  @IsString()
  usuarioId: string;
}
