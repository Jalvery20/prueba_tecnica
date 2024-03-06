import { Injectable } from '@nestjs/common';
import {
  CreateClientDto,
  FindClientDto,
  UpdateClientDto,
} from './dto/client.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './model/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}
  async findClients(findClientDto: FindClientDto): Promise<
    {
      id: string;
      identificacion: string;
      nombre: string;
      apellidos: string;
    }[]
  > {
    const { identificacion, nombre, usuarioId } = findClientDto;
    const query: any = {};
    if (identificacion) {
      query.identificacion = identificacion;
    }

    if (nombre) {
      query.nombre = new RegExp(nombre, 'i'); // Busca de manera insensible a mayúsculas y minúsculas
    }
    query.usuarioId= usuarioId

    const result = await this.clientModel
      .find(query)
      .select('id identificacion nombre apellidos')
      .lean()
      .exec();

    
    return result.map((cliente) => ({
      id: cliente._id.toString(), 
      identificacion: cliente.identificacion,
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
    }));
  }

  async deleteClient(idCliente: string): Promise<void> {
    await this.clientModel.deleteOne({ _id: idCliente }).lean().exec();
  }

  async getClientInfo(idCliente: string): Promise<Client> {
    const cliente = await this.clientModel.findById(idCliente).lean().exec();
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    return cliente;
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = new this.clientModel(createClientDto);
    const savedClient = await newClient.save();
    return savedClient;
  }

  async updateClient(updateClientDto: UpdateClientDto): Promise<Client> {
    const { id, ...data } = updateClientDto;
    const _id = id;
    // Actualiza el documento del cliente en la base de datos
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(_id, data, { new: true })
      .exec();
    // Asegúrate de manejar el caso en que el cliente no se encuentre
    if (!updatedClient) {
      throw new Error('Cliente no encontrado');
    }
    return updatedClient;
  }
}
