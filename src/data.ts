type Data = {
    reports: Array<Report>;
};

export type Report = {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
};

export enum ReportType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

export const data: Data = {
    reports: [
        {
            id: 'uuid1',
            source: 'salary',
            amount: 7_500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: 'uuid2',
            source: 'salary',
            amount: 3_500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: 'uuid3sa',
            source: 'salary',
            amount: 2_250,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE,
        },
    ],
};
