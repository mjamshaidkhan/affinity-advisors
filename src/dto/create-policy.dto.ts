import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreatePolicyDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly policy: string;
  readonly createdAt: Date;
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly description: string;
}
