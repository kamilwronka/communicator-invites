import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CustomSerializerInterceptor } from 'src/interceptors/custom-serializer.interceptor';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteParamsDto } from './dto/invite-params.dto';
import { InvitesService } from './invites.service';
import { Invite } from './schemas/invite.schema';
@ApiTags('invites')
@UseInterceptors(CustomSerializerInterceptor(Invite))
@Controller('')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @ApiOkResponse({
    description: 'Invite has been retrieved.',
    type: Invite,
  })
  async getInvite(@Param() params: InviteParamsDto): Promise<Invite> {
    return this.invitesService.getInvite(params.id);
  }

  @Post('')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Invite,
  })
  async createInvite(@Body() data: CreateInviteDto): Promise<Invite> {
    return this.invitesService.createInvite(data);
  }

  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted',
    type: Invite,
  })
  async deleteInvite(@Param() params: InviteParamsDto): Promise<Invite> {
    return this.invitesService.deleteInvite(params.id);
  }

  @ApiParam({ name: 'id', type: String })
  @Get('servers/:id')
  @ApiOkResponse({
    description: 'Server invites list has been retrieved.',
    type: Invite,
    isArray: true,
  })
  async getInvitesByServerId(
    @Param() params: InviteParamsDto,
  ): Promise<Invite[]> {
    return this.invitesService.getInvitesByServerId(params.id);
  }
}
