import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { IUser } from '../../common/interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { USER } from '../../common/models/models';
import { User } from '../user.model';
import { HttpStatus } from '@nestjs/common';

// Mock del modelo Mongoose
const mockModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  mockConstructor: jest.fn().mockImplementation(function (dto) {
    return {
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    };
  }),
};

// Descripción del conjunto de pruebas para UserService
describe('UserService', () => {
  // Instancia del servicio a probar
  let service: UserService;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(USER.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // Limpiar mocks después de cada prueba
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Prueba: UserService debe estar definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Prueba: checkPassword debe devolver true si las contraseñas coinciden
  describe('checkPassword', () => {
    it('should return true if passwords match', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await service.checkPassword(password, hashedPassword);
      expect(result).toBe(true);
    });

    // Prueba: checkPassword debe devolver false si las contraseñas no coinciden
    it('should return false if passwords do not match', async () => {
      const password = 'password123';
      const invalidPassword = 'invalidpassword';

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await service.checkPassword(invalidPassword, hashedPassword);
      expect(result).toBe(false);
    });
  });

  // Prueba: findByUsername debe encontrar un usuario por nombre de usuario
  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      const username = 'john_doe';
      const userDTO: UserDTO = {
        name: 'John Doe',
        username,
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const user: Partial<IUser> = { ...userDTO };

      mockModel.findOne.mockResolvedValue(user);

      const result = await service.findByUsername(username);
      expect(result).toEqual(user);
      expect(mockModel.findOne).toHaveBeenCalledWith({ username });
    });
  });

  // Prueba: hashPassword debe hashear una contraseña
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'password123';
      const hashedPassword = await service.hashPassword(password);

      expect(hashedPassword).not.toEqual(password);
    });
  });

  // Prueba: findAll debe encontrar todos los usuarios
  describe('findAll', () => {
    it('should find all users', async () => {
      const usersDTO: UserDTO[] = [
        {
          name: 'User1',
          username: 'user1',
          email: 'user1@example.com',
          password: 'password1',
        },
        {
          name: 'User2',
          username: 'user2',
          email: 'user2@example.com',
          password: 'password2',
        },
      ];

      const users: Partial<IUser>[] = usersDTO.map((userDTO) => ({ ...userDTO }));

      mockModel.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  // Prueba: findOne debe encontrar un usuario por ID
  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const userId = 'some-user-id';
      const userDTO: UserDTO = {
        name: 'User1',
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
      };

      const user: Partial<IUser> = { ...userDTO };

      mockModel.findById.mockResolvedValue(user);

      const result = await service.findOne(userId);
      expect(result).toEqual(user);
      expect(mockModel.findById).toHaveBeenCalledWith(userId);
    });
  });

  // Prueba: update debe actualizar un usuario
  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'some-user-id';
      const userDTO: UserDTO = {
        name: 'John Doe',
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const hashedPassword = await bcrypt.hash(userDTO.password, 10);
      const updatedUser: Partial<IUser> = { ...userDTO, password: hashedPassword };

      mockModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const result = await service.update(userId, userDTO);

      // Verifica que se haya llamado al método con el userId y un objeto para el update
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        expect.objectContaining({
          name: userDTO.name,
          username: userDTO.username,
          email: userDTO.email,
        }),
        { new: true }
      );
      expect(result).toEqual(updatedUser);
    });
  });

  // Prueba: delete debe eliminar un usuario
  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = 'some-user-id';

      const result = await service.delete(userId);
      expect(result).toEqual({
        status: HttpStatus.OK,
        msg: 'Deleted',
      });
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
    });
  });
});

