import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { IUser } from '../../common/interfaces/user.interface';
import { User } from '../user.model';
import { UserDTO } from '../dto/user.dto';
import { HttpStatus } from '@nestjs/common';

// Descripción del conjunto de pruebas para UserController
describe('UserController', () => {
  // Instancias del controlador y servicio a probar
  let controller: UserController;
  let userService: UserService;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAll2: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByUsername: jest.fn(),
            checkPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  // Limpiar mocks después de cada prueba
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Prueba: UserController debe estar definido
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Prueba: findAll2 debe devolver un array de usuarios
  describe('findAll2', () => {
    it('should return an array of users', async () => {
      const userArray: User[] = [
        { name: 'User1', username: 'user1', email: 'user1@example.com', password: 'password1' },
      ];
      jest.spyOn(userService, 'findAll2').mockResolvedValue(userArray);

      const result = await controller.findAll2();
      expect(result).toEqual(userArray);
    });
  });

  // Prueba: create debe llamar a UserService para crear un usuario
  describe('create', () => {
    it('should call UserService to create a user', async () => {
      const userDTO: UserDTO = {
        name: 'User',
        username: 'User',
        email: 'User',
        password: 'User',
      };
      const createdUser: User = {
        name: 'User',
        username: 'User',
        email: 'User',
        password: 'User',
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(userDTO);
      expect(result).toEqual(createdUser);
      expect(userService.create).toBeCalledWith(userDTO);
    });
  });

  // Prueba: update debe llamar a UserService para actualizar un usuario
  describe('update', () => {
    it('should call UserService to update a user', async () => {
      const userId = 'some-user-id';
      const userDTO: UserDTO = {
        name: '',
        username: '',
        email: '',
        password: '',
      };
      const updatedUser = {
        name: '',
        username: '',
        email: '',
        password: '',
      };
      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);
      const result = await controller.update({ id: userId, userDTO });
      expect(result).toEqual(updatedUser);
      expect(userService.update).toBeCalledWith(userId, userDTO);
    });
  });

  // Prueba: delete debe llamar a UserService para eliminar un usuario
  describe('delete', () => {
    it('should call UserService to delete a user', async () => {
      const userId = 'some-user-id';
      const deleteResult = { status: HttpStatus.OK, msg: 'Deleted' };

      jest.spyOn(userService, 'delete').mockResolvedValue(deleteResult);

      const result = await controller.delete(userId);
      expect(result).toEqual(deleteResult);
      expect(userService.delete).toBeCalledWith(userId);
    });
  });

  // Prueba: validateUser2 debe validar un usuario y devolver el objeto de usuario
  describe('validateUser2', () => {
    it('should validate a user and return the user object', async () => {
      const payload = {
        username: 'john_doe',
        password: 'password123',
      };

      const user: Partial<IUser> = {
        name: 'John Doe',
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const isValidPassword = true;

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user as any);

      jest.spyOn(userService, 'checkPassword').mockResolvedValue(isValidPassword);

      const result = await controller.validateUser2(payload);
      expect(result).toEqual(user as IUser);
      expect(userService.findByUsername).toBeCalledWith(payload.username);
      expect(userService.checkPassword).toBeCalledWith(payload.password, user.password);
    });

    it('should return null for an invalid user', async () => {
      const payload = {
        username: 'john_doe',
        password: 'invalidpassword',
      };

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(null);

      const result = await controller.validateUser2(payload);
      expect(result).toBeNull();
      expect(userService.findByUsername).toBeCalledWith(payload.username);
      // También puedes verificar que userService.checkPassword no se llame en este caso
    });
  });
});

