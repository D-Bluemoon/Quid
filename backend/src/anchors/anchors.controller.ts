import { Controller, Get, Query } from '@nestjs/common';
import { AnchorDiscoveryService } from './anchor-discovery.service';

@Controller('anchors')
export class AnchorsController {
  constructor(private readonly anchors: AnchorDiscoveryService) {}

  @Get()
  async list(@Query('country') country?: string, @Query('asset') asset?: string) {
    return this.anchors.list({ country, asset });
  }
}
