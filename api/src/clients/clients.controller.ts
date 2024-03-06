import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import {
  CreateClientDto,
  FindClientDto,
  UpdateClientDto,
} from './dto/client.dto';
import { ClientAuthGuard } from './guards/client.guard';
import { Response } from 'express';

@Controller('api/Cliente')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('Obtener/:idCliente')
  async getClientInfo(@Param('idCliente') idCliente: string) {
    return this.clientsService.getClientInfo(idCliente);
  }

  @Post('Crear')
  async createClient(
    @Body(ValidationPipe) createClientDto: CreateClientDto,
    @Res() res: Response,
  ) {
      try {
        await this.clientsService.createClient(createClientDto);
        res.status(200).send('Success');
      } catch (error) {
        // Verificar si el error es un error de duplicación de claves
        if (error.code === 11000) {
        throw new ConflictException('La identificación ya existe');
        } 
      }
    }

  @Post('Actualizar')
  async updateClient(
    @Body(ValidationPipe) updateClientDto: UpdateClientDto,
    @Res() res: Response,
  ) {
  try {
        await this.clientsService.updateClient(updateClientDto);
        res.status(200).send('Success');
      } catch (error) {
        if (error.code === 11000) {
        throw new ConflictException('La identificación ya existe');
        } 
      }
    
  }

  @Post('Listado')
  @UseGuards(ClientAuthGuard)
  async findClients(
    @Body(ValidationPipe) findClientDto: FindClientDto,
  ): Promise<
    {
      id: string;
      identificacion: string;
      nombre: string;
      apellidos: string;
    }[]
  > {
    return this.clientsService.findClients(findClientDto);
  }

  @Delete('Eliminar/:IdCliente')
  @UseGuards(ClientAuthGuard)
  async deleteClient(
    @Param('IdCliente') idCliente: string,
    @Res() res: Response,
  ) {
    await this.clientsService.deleteClient(idCliente);
    res.status(200).send('Success');
  }
}
