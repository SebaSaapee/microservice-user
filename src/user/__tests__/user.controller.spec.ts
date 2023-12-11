import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserModule } from '../user.module';
import { getModelToken } from '@nestjs/mongoose';
import { USER } from '../../common/models/models';
import { UserService } from '../user.service';
import { UserSchema } from '../schema/user.schema';
import { UserDTO } from '../dto/user.dto';
import { UserMSG } from '../../common/constants';
import { IUser } from '../../common/interfaces/user.interface';
import { User } from '../user.model';

// Define la interfaz IUser2 para las pruebas
export interface IUser2 {
  name: string;
  username: string;
  email: string;
  password: string;
  // Cualquier otra propiedad que un usuario debería tener
}

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).overrideProvider(getModelToken(USER.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  // Caso de prueba para el método 'findAll'
  describe('findAll', () => {
    it('debería devolver un array de tipo User', async () => {
      // Simula el método 'findAll' de userService para resolver con un array
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));

      // Llama al método 'findAll' del controlador
      const result = await controller.findAll();

      // Espera que el array de resultado tenga longitud 1
      expect(result).toHaveLength(1);
    });

    it('debería devolver un array de tipo User', async () => {
      // Simula el método 'findAll' de userService para resolver con un array
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));

      // Llama al método 'findAll' del controlador
      const result = await controller.findAll();

      // Espera que el array de resultado sea igual al modelo USER
      expect(result).toEqual([USER]);
    });

    it('debería devolver un array de tipo User', async () => {
      // Simula el método 'findAll' de userService para resolver con un array
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));

      // Llama al método 'findAll' del controlador
      const result = await controller.findAll();

      // Espera que el método 'findAll' de userService se llame una vez
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // Caso de prueba para el método 'findAll2'
  describe('findAll2', () => {
    it('debería devolver un array de usuarios y llamar a findAll2 una vez', async () => {
      // Mock de datos de usuarios
      const mockUsers: User[] = [{ name: 'Usuario1', username: 'usuario1', email: 'usuario1@example.com', password: 'contraseña1' }];

      // Simula el método 'findAll2' de userService para resolver con mockUsers
      jest.spyOn(userService, 'findAll2').mockResolvedValue(mockUsers);

      // Llama al método 'findAll2' del controlador
      const result = await controller.findAll2();

      // Espera que la longitud del array de resultado coincida con el número de mockUsers
      expect(result).toHaveLength(mockUsers.length);

      // Espera que el array de resultado sea igual a mockUsers
      expect(result).toEqual(mockUsers);

      // Espera que el método 'findAll2' de userService se llame una vez
      expect(userService.findAll2).toHaveBeenCalledTimes(1);
    });
  });
});
