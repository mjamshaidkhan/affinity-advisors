import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class SignInDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly username: string;
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly password: string;
}
