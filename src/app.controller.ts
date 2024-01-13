import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
    ParseUUIDPipe,
    ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';
import {
    CreateReportDto,
    ReportResponseDto,
    UpdateReportDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    findAll(
        @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    ): Array<ReportResponseDto> {
        return this.appService.findAll(type);
    }

    @Post()
    createEntity(
        @Body() body: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ): ReportResponseDto {
        return this.appService.createEntity(type as ReportType, body);
    }

    @Get(':id')
    getById(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ): ReportResponseDto {
        const report = this.appService.getById(type as ReportType, id);

        if (!report) throw new NotFoundException();

        return report;
    }

    @Put(':id')
    updateById(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
        @Body() body: UpdateReportDto,
    ): ReportResponseDto {
        const report = this.appService.updateById(type, id, body);

        if (!report) throw new NotFoundException();

        return report;
    }

    @HttpCode(204)
    @Delete(':id')
    removeById(@Param('id', ParseUUIDPipe) id: string) {
        const entity = this.appService.removeById(id);
        if (entity === -1) throw new NotFoundException();
        return;
    }
}
