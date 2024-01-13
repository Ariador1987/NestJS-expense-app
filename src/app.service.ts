import { Injectable } from '@nestjs/common';
import { Report, ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface ReportData {
    amount: number;
    source: string;
}

@Injectable()
export class AppService {
    findAll(type: ReportType): Report[] {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        return data.reports.filter((report) => report.type === reportType);
    }

    getById(type: ReportType, id: string) {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

        const report = data.reports
            .filter((report) => report.type === reportType)
            .find((report) => report.id === id);

        return report;
    }

    createEntity(type: ReportType, body: ReportData) {
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
        return newReport;
    }

    updateById(type: ReportType, id: string, body: Partial<ReportData>) {
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

        return data.reports[reportIndex];
    }

    removeById(id: string) {
        const entityIdx = data.reports.findIndex((report) => report.id === id);

        data.reports.splice(entityIdx, 1);

        return entityIdx;
    }
}
