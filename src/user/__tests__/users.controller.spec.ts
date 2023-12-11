import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { IUser } from '../../common/interfaces/user.interface';
import { User } from '../user.model';
import { UserDTO } from '../dto/user.dto';

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;

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

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // Prueba para findAll2
    describe('findAll2', () => {
        it('should return an array of users', async () => {
        const userArray: User[] = [{ name: 'User1', username: 'user1', email: 'user1@example.com', password: 'password1' }];
        jest.spyOn(userService, 'findAll2').mockResolvedValue(userArray);

        const result = await controller.findAll2();
        expect(result).toEqual(userArray);
        });
    });
    // Continuando con las pruebas de UserController...
    
    // Prueba para el método create
    describe('create', () => {
        it('should call UserService to create a user', async () => {
        const userDTO: UserDTO = {
            name: 'User',
            username: 'User',
            email: 'User',
            password: 'User'
        };
        const createdUser: User = {
            name: 'User',
            username: 'User',
            email: 'User',
            password: 'User'
        };
    
        jest.spyOn(userService, 'create').mockResolvedValue(createdUser);
    
        const result = await controller.create(userDTO);
        expect(result).toEqual(createdUser);
        expect(userService.create).toBeCalledWith(userDTO);
        });
    });

    // Create
    describe('create', () => {
        it('should call UserService to create a user', async () => {
            const userDTO: UserDTO = {
                name: 'User',
                username: 'User',
                email: 'User',
                password: 'User'
            };
            const createdUser= {
                name: '',
                username: '',
                email: '',
                password: ''
            };
    
          jest.spyOn(userService, 'create').mockResolvedValue(createdUser);
    
          const result = await controller.create(userDTO);
          expect(result).toEqual(createdUser);
          expect(userService.create).toBeCalledWith(userDTO);
        });
      });
      //update
      describe('update', () => {
        it('should call UserService to update a user', async () => {
          const userId = 'some-user-id';
          const userDTO: UserDTO = {
              name: '',
              username: '',
              email: '',
              password: ''
          };
          const updatedUser = {
            name: '',
            username: '',
            email: '',
            password: ''
        };
    
          jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);
    
          const result = await controller.update({ id: userId, userDTO });
          expect(result).toEqual(updatedUser);
          expect(userService.update).toBeCalledWith(userId, userDTO);
        });
      });
});
