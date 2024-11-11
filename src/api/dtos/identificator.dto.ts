import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UUIDParamDto {
    @ApiProperty({ required: true, type: 'UUID' })
    id: UUID
}

export class IdParamDto {
    @ApiProperty({ required: true, type: 'number' })
    id: number
}