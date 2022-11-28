import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from './schemas/invite.schema';
import { UsersModule } from 'src/users/users.module';
import { ServersModule } from 'src/servers/servers.module';

@Module({
  providers: [InvitesService],
  controllers: [InvitesController],
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    UsersModule,
    ServersModule,
  ],
})
export class InvitesModule {}
