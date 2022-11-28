import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ServerData } from './types';

@Injectable()
export class ServersService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(ServersService.name);

  async getById(userId: string): Promise<ServerData> {
    const { data } = await firstValueFrom(
      this.httpService.get<ServerData>(`/internal/${userId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new BadGatewayException(error.message);
        }),
      ),
    );

    return data;
  }
}
