import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface ReportData {
    amount: number;
    source: string;
}

@Injectable()
export class AppService {
    findAll(type: ReportType): ReportResponseDto[] {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        const reports = data.reports
            .filter((report) => report.type === reportType)
            .map((report) => new ReportResponseDto(report));
        console.log(reports);

        return reports;
    }

    getById(type: ReportType, id: string): ReportResponseDto {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

        const report = data.reports
            .filter((report) => report.type === reportType)
            .find((report) => report.id === id);

        return new ReportResponseDto(report);
    }

    createEntity(type: ReportType, body: ReportData): ReportResponseDto {
        const { source, amount } = body;

        const newReport = {
            id: uuid(),
            source,
            amount,
            created_at: new Date(),
            updated_at: new Date(),
            type,
        };

        data.reports.push(newReport);
        return new ReportResponseDto(newReport);
    }

    updateById(
        type: ReportType,
        id: string,
        body: Partial<ReportData>,
    ): ReportResponseDto {
        const reportToUpdate = data.reports
            .filter((report) => report.type === type)
            .find((report) => report.id === id);

        const reportIndex = data.reports.findIndex(
            (report) => report.id === reportToUpdate.id,
        );

        data.reports[reportIndex] = {
            ...data.reports[reportIndex],
            ...body,
        };

        return new ReportResponseDto(data.reports[reportIndex]);
    }

    removeById(id: string): number {
        const entityIdx = data.reports.findIndex((report) => report.id === id);

        data.reports.splice(entityIdx, 1);

        return entityIdx;
    }
}
