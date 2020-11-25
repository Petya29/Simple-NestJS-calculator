import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDTO {
    @ApiProperty({ description: 'first value to calculate ' })
    readonly val1: String;

    @ApiProperty({ description: 'second value to calculate' })
    readonly val2: String;

    @ApiProperty()
    readonly calcOption: String;

    @ApiProperty()
    readonly numberType: String;

    @ApiProperty()
    result: String;
}