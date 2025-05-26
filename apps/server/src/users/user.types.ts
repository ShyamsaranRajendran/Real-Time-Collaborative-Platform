import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

// User interface for typing user objects (e.g. entities, return types)
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// DTO class for user creation with validation
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;  // optional avatar field (or fullName if you want)
}

// DTO interface for update operations (partial and optional)
export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
