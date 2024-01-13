import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';

export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto extends PartialType(CreateReportDto) {}

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    type: ReportType;

    @Expose({ name: 'createdAt' })
    transformCreatedAt() {
        return this.createdAt;
    }

    constructor(partial: Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }
}
