// src/cliente/schemas/cliente.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClienteDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true, maxlength: 50 })
  nombre: string;

  @Prop({ required: true, maxlength: 100 })
  apellidos: string;

  @Prop({ required:true, unique:true, maxlength: 20 })
  identificacion: string;

  @Prop({ required: true, maxlength: 20 })
  telefonoCelular: string;

  @Prop({ required: true, maxlength: 20 })
  otroTelefono: string;

  @Prop({ required: true, maxlength: 200 })
  direccion: string;

  @Prop({ required: true, type: Date })
  fNacimiento: Date;

  @Prop({ required: true, type: Date })
  fAfiliacion: Date;

  @Prop({ required: true, enum: ['M', 'F'] })
  sexo: 'M' | 'F';

  @Prop({ required: true, maxlength: 200 })
  resenaPersonal: string;

  @Prop()
  imagen: string;

  @Prop({required: true, type: String})
  interesFK: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) 
  usuarioId: Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
