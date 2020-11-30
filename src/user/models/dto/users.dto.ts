import { ApiProperty } from '@nestjs/swagger'

export class UserDTO {

    @ApiProperty()
    readonly username: String;
    
    @ApiProperty()
    readonly password: String;
}