import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';
import { Serilize } from '../interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serilize(ReportDto)
  createReport(@CurrentUser() user: User, @Body() body: CreateReportDto) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }
}
