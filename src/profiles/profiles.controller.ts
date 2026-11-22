import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dot.js';
import { UpdateProfileDto } from './dto/update-profile.dot.js';
import { ProfilesService } from './profiles.service.js';
import type { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const matchingProfile = this.profilesService.findOne(id);

    if (!matchingProfile) {
      throw new NotFoundException(`Profile with ID: ${id} not found`);
    }
    return matchingProfile;
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profilesService.delete(id);
  }
}
