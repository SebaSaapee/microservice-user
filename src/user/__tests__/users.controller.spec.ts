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
                findAll2: jest.fn(),
                create: jest.fn(),
                // ... otros métodos a mockear
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
            name: '',
            username: '',
            email: '',
            password: ''
        };
        const createdUser: User = {
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
});
