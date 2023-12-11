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
      //controllers: [UserController],
      imports:[UserModule],
    }).overrideProvider(getModelToken(USER.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll',()=>{
    it ('must reutn an array of type User', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));
      const result = await controller.findAll();
      expect(result).toHaveLength(1) // La cantidad de resultados entregados es 1
    })
  })
  describe('findAll',()=>{
    it ('must reutn an array of type User', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));
      const result = await controller.findAll();
      expect(result).toEqual([USER])
    })
  })
  describe('findAll',()=>{
    it ('must reutn an array of type User', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));
      const result = await controller.findAll();
      expect(userService.findAll).toHaveBeenCalledTimes(1)//que solo se haga 1 llamada
    })
  })
  describe('findAll2', () => {
    it('should return an array of users and call findAll2 once', async () => {
      const mockUsers: User[] = [{ name: 'User1', username: 'user1', email: 'user1@example.com', password: 'password1' }];
      jest.spyOn(userService, 'findAll2').mockResolvedValue(mockUsers);
      const result = await controller.findAll2();
      expect(result).toHaveLength(mockUsers.length);//asegura que el número de usuarios devueltos coincida con el número de usuarios que simulaste en tu mock.
    });
  });
  describe('findAll2', () => {
    it('should return an array of users and call findAll2 once', async () => {
      const mockUsers: User[] = [{ name: 'User1', username: 'user1', email: 'user1@example.com', password: 'password1' }];
      jest.spyOn(userService, 'findAll2').mockResolvedValue(mockUsers);
      const result = await controller.findAll2();
      expect(result).toEqual(mockUsers);//Verifica que el contenido de result sea exactamente igual al contenido de mockUsers
    });
  });
  describe('findAll2', () => {
    it('should return an array of users and call findAll2 once', async () => {
      const mockUsers: User[] = [{ name: 'User1', username: 'user1', email: 'user1@example.com', password: 'password1' }];
      jest.spyOn(userService, 'findAll2').mockResolvedValue(mockUsers);
      const result = await controller.findAll2();
      expect(userService.findAll2).toHaveBeenCalledTimes(1);
    });
  });
});


 