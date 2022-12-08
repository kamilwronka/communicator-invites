import {
  MessageHandlerErrorBehavior,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queues } from '../enums/queues.enum';
import { RoutingKeys } from '../enums/routing-keys.enum';
import { CreateServerDto } from './dto/create-server.dto';
import { DeleteServerDto } from './dto/delete-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Server, ServerDocument } from './schemas/server.schema';

@Injectable()
export class ServersService {
  constructor(
    @InjectModel(Server.name) private serverModel: Model<ServerDocument>,
  ) {}
  private readonly logger = new Logger(ServersService.name);

  async getById(id: string) {
    const server = await this.serverModel.findOne({ serverId: id });

    if (!server) {
      throw new NotFoundException('server not found');
    }

    return server;
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_CREATE,
    queue: Queues.SERVER_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async create({ id, ...data }: CreateServerDto) {
    try {
      const server = new this.serverModel({ serverId: id, ...data });

      await server.save();
      this.logger.log(`Created server with id: ${id}`);
    } catch (error) {
      this.logger.error(`Unable to create server: ${JSON.stringify(error)}`);
      new Nack();
    }
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_CREATE,
    queue: Queues.SERVER_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async update({ id, ...data }: UpdateServerDto) {
    try {
      const response = await this.serverModel.findOneAndUpdate(
        { serverId: id },
        data,
      );

      if (response) {
        this.logger.log(`Updated server with id: ${id}`);
      }
    } catch (error) {
      this.logger.error(`Unable to update server: ${JSON.stringify(error)}`);
      new Nack();
    }
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_DELETE,
    queue: Queues.SERVER_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async delete({ id }: DeleteServerDto) {
    try {
      const response = await this.serverModel.findOneAndDelete({
        serverId: id,
      });

      if (response) {
        this.logger.log(`Deleted server with id: ${id}`);
      }
    } catch (error) {
      this.logger.error(`Unable to delete server: ${JSON.stringify(error)}`);
    }
  }
}
