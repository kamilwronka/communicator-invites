import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UserData } from './types';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(UsersService.name);

  async getById(userId: string): Promise<UserData> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserData>(`/internal/${userId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new BadGatewayException(error.message);
        }),
      ),
    );

    return data;
  }
}
