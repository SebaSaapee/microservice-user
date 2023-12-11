// user.dto.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from '../../user/dto/user.dto';

describe('UserDTO', () => {
  let createUserDto: () => UserDTO;

  beforeEach(() => {
    createUserDto = () => ({
      name: 'John Doe',
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });

  it('should be defined', () => {
    const userDto = createUserDto();
    expect(userDto).toBeDefined();
  });

  it('should have a valid name', () => {
    const userDto = createUserDto();
    expect(userDto.name).toEqual('John Doe');
  });

  it('should have a valid username', () => {
    const userDto = createUserDto();
    expect(userDto.username).toEqual('john_doe');
  });

  it('should have a valid email', () => {
    const userDto = createUserDto();
    expect(userDto.email).toEqual('john.doe@example.com');
  });

  it('should have a valid password', () => {
    const userDto = createUserDto();
    expect(userDto.password).toEqual('password123');
  });
});
