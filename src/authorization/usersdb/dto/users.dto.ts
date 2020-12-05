import { ApiProperty } from '@nestjs/swagger'

export class UsersDTO {
    @ApiProperty()
    readonly username: String;
    
    @ApiProperty()
    readonly password: String;
}