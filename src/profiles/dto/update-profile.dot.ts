import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
