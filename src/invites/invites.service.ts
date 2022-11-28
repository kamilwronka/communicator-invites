import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServersService } from 'src/servers/servers.service';
import { UsersService } from 'src/users/users.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { validateInvite } from './helpers/validate-invite.helper';
import { Invite, InviteDocument } from './schemas/invite.schema';

@Injectable()
export class InvitesService {
  constructor(
    @InjectModel(Invite.name)
    private inviteModel: Model<InviteDocument>,
    private readonly usersService: UsersService,
    private readonly serversService: ServersService,
  ) {}

  async getInvite(id: string) {
    const invite = await this.inviteModel.findById(id);
    const isValid = validateInvite(invite);

    if (!isValid) {
      throw new NotFoundException();
    }

    const user = await this.usersService.getById(invite.inviter.id);
    const server = await this.serversService.getById(invite.server.id);

    const data = {
      ...invite.toJSON(),
      server: {
        id: server._id,
        name: server.name,
        icon: server.icon,
      },
      inviter: user,
    };

    return new Invite(data);
  }

  async createInvite(data: CreateInviteDto) {
    const { maxAge, maxUses, inviterId, serverId, validate } = data;

    if (validate) {
      let existingInvite;
      let isValid;

      try {
        existingInvite = await this.getInvite(validate);
        isValid = validateInvite(existingInvite);
      } catch (error) {
        isValid = false;
      }

      if (isValid) {
        return existingInvite;
      }

      await this.deleteInvite(validate);
    }

    const inviteData: Partial<Invite> = {
      maxAge,
      maxUses,
      inviter: {
        id: inviterId,
      },
      server: {
        id: serverId,
      },
    };

    const invite = new this.inviteModel(inviteData);
    const databaseResponse = await invite.save();

    const user = await this.usersService.getById(invite.inviter.id);
    const server = await this.serversService.getById(invite.server.id);

    const response = {
      ...databaseResponse.toJSON(),
      server: {
        id: server._id,
        name: server.name,
        icon: server.icon,
      },
      inviter: user,
    };

    return new Invite(response);
  }

  async deleteInvite(id: string) {
    return this.inviteModel.findByIdAndDelete(id);
  }

  async getInvitesByServerId(id: string) {
    const invites = await this.inviteModel.find({
      'server.id': id,
    });

    const serverIds = [];
    const userIds = [];

    invites.forEach(({ server, inviter }) => {
      if (!serverIds.includes(server.id)) {
        serverIds.push(server.id);
      }
      if (!userIds.includes(inviter.id)) {
        userIds.push(inviter.id);
      }
    });

    const users = await Promise.all(
      userIds.map((id) => {
        return this.usersService.getById(id);
      }),
    );
    const servers = await Promise.all(
      serverIds.map((id) => {
        return this.serversService.getById(id);
      }),
    );

    const response = invites.map((invite) => {
      const server = servers.find((server) => server._id === invite.server.id);
      const user = users.find((user) => user.id === invite.inviter.id);

      const data = {
        ...invite.toJSON(),
        server: {
          id: server._id,
          name: server.name,
          icon: server.icon,
        },
        inviter: user,
      };

      return new Invite(data);
    });

    return response;
  }
}
