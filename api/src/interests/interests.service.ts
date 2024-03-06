import { Injectable } from '@nestjs/common';

@Injectable()
export class InterestsService {
  async getInterestsList(): Promise<{ id: string; descripcion: string }[]> {
    return [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        descripcion: 'Deportes',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        descripcion: 'Música',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        descripcion: 'Arte',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa9',
        descripcion: 'Cocina',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afaa',
        descripcion: 'Viajes',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afab',
        descripcion: 'Tecnología',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afac',
        descripcion: 'Lectura',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afad',
        descripcion: 'Jardinería',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afae',
        descripcion: 'Fotografía',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afaf',
        descripcion: 'Cine',
      },
    ];
  }
}
