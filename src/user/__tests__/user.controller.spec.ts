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
  describe('findAll',()=>{
    it ('must reutn an array of type User', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve([{ name: 'users' }] as unknown as Promise<IUser[]>));
      const result = await controller.findAll();
      expect(userService.findAll).toHaveBeenCalledTimes(1)//que solo se haga 1 llamada
    })
  })
});


  /*
  it('must return an array of users', async () => {
    const userArray: IUser[] = [
      { name: 'Ejemplo', username: 'ejemplo', email: 'test@test.com', password: 'securePassword'}
    ];
  
    jest.spyOn(userService, 'findAll').mockImplementation(async () => userArray);
  
    const result = await controller.findAll();
  
    expect(result).toHaveLength(userArray.length); // Verifica la longitud del array
    expect(result).toEqual(userArray); // Verifica que el resultado sea igual al array de usuarios
    //expect(userService.findAll).toHaveBeenCalledTimes(1); // Verifica que se haya llamado una vez
  });
  */