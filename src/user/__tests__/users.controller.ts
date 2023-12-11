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
                findAll: jest.fn(),
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

    // Prueba para findAll
    describe('findAll2', () => {
        it('should return an array of users', async () => {
        const userArray: User[] = [{ name: 'User1', username: 'user1', email: 'user1@example.com', password: 'password1' }];
        jest.spyOn(userService, 'findAll2').mockResolvedValue(userArray);

        const result = await controller.findAll2();
        expect(result).toEqual(userArray);
        expect(userService.findAll).toBeCalledTimes(1);
        });
    });
    // Continuando con las pruebas de UserController...

    // Prueba para el método create
    describe('create', () => {
        it('should call UserService to create a user', async () => {
        const userDTO: UserDTO = { /* datos de ejemplo para crear un usuario */ };
        const createdUser: User = { /* el usuario que esperas que UserService devuelva después de crear */ };
    
        jest.spyOn(userService, 'create').mockResolvedValue(createdUser);
    
        const result = await controller.create(userDTO);
        expect(result).toEqual(createdUser);
        expect(userService.create).toBeCalledWith(userDTO);
        });
    });
    
    // Prueba para el método findOne
    describe('findOne', () => {
        it('should call UserService to return a single user', async () => {
        const userId = 'some-user-id';
        const foundUser: IUser = { /* el usuario que esperas encontrar */ };
    
        jest.spyOn(userService, 'findOne').mockResolvedValue(foundUser);
    
        const result = await controller.findOne(userId);
        expect(result).toEqual(foundUser);
        expect(userService.findOne).toBeCalledWith(userId);
        });
    });
    
    // Prueba para el método delete
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
    
    // Agrega aquí más pruebas para otros métodos del controlador
});
