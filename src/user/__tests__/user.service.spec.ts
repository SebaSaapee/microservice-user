import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { IUser } from '../../common/interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { USER } from '../../common/models/models';
import { User } from '../user.model';

// Mock the Mongoose Model
const mockModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  mockConstructor: jest.fn().mockImplementation(function(dto) {
    return {
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    };
  }),
};

describe('UserService', () => {
    let service: UserService;

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

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    
    describe('checkPassword', () => {
        it('should return true if passwords match', async () => {
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await service.checkPassword(password, hashedPassword);
        expect(result).toBe(true);
        });

        it('should return false if passwords do not match', async () => {
        const password = 'password123';
        const invalidPassword = 'invalidpassword';

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await service.checkPassword(invalidPassword, hashedPassword);
        expect(result).toBe(false);
        });
    });
    
    describe('findByUsername', () => {
        it('should find a user by username', async () => {
        const username = 'john_doe';
        const userDTO: UserDTO = { 
            name: 'John Doe', 
            username, 
            email: 'john.doe@example.com', 
            password: 'password123' 
        };

        const user: Partial<IUser> = { ...userDTO };

        mockModel.findOne.mockResolvedValue(user);

        const result = await service.findByUsername(username);
        expect(result).toEqual(user);
        expect(mockModel.findOne).toHaveBeenCalledWith({ username });
        });
    });
    
    describe('hashPassword', () => {
        it('should hash a password', async () => {
        const password = 'password123';
        const hashedPassword = await service.hashPassword(password);

        expect(hashedPassword).not.toEqual(password);
        });
    });

    
    /*
    describe('create', () => {
        it('should create a new user', async () => {
          const userDTO: UserDTO = {
            name: 'John Doe',
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'password123',
          };
    
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);
          const newUser: User = { ...userDTO, password: hashedPassword };
    
          mockModel.mockConstructor.mockResolvedValue(newUser);
    
          const result = await service.create(userDTO);
          expect(result).toEqual(newUser);
          expect(mockModel.mockConstructor).toHaveBeenCalledWith({ ...userDTO, password: hashedPassword });
        });
      });
    */
   /*
    describe('findAll', () => {
        it('should find all users', async () => {
        const usersDTO: UserDTO[] = [
            { 
            name: 'User1', 
            username: 'user1', 
            email: 'user1@example.com', 
            password: 'password1' 
            },
            { 
            name: 'User2', 
            username: 'user2', 
            email: 'user2@example.com', 
            password: 'password2' 
            },
        ];

        const users: Partial<IUser>[] = usersDTO.map(userDTO => ({ ...userDTO }));

        mockModel.find.mockResolvedValue(users);

        const result = await service.findAll();
        expect(result).toEqual(users);
        expect(mockModel.find).toHaveBeenCalled();
        });
    });
    /*
    describe('findAll2', () => {
        it('should find all users using lean', async () => {
        const usersDTO: UserDTO[] = [
            { 
            name: 'User1', 
            username: 'user1', 
            email: 'user1@example.com', 
            password: 'password1' 
            },
            { 
            name: 'User2', 
            username: 'user2', 
            email: 'user2@example.com', 
            password: 'password2' 
            },
        ];

        const users: Partial<IUser>[] = usersDTO.map(userDTO => ({ ...userDTO }));

        mockModel.find.mockResolvedValue(users);

        const result = await service.findAll2();
        expect(result).toEqual(users);
        expect(mockModel.find).toHaveBeenCalled();
        });
    });
    /*
    describe('findOne', () => {
        it('should find a user by ID', async () => {
        const userId = 'some-user-id';
        const userDTO: UserDTO = { 
            name: 'User1', 
            username: 'user1', 
            email: 'user1@example.com', 
            password: 'password1' 
        };

        const user: Partial<IUser> = { ...userDTO };

        mockModel.findById.mockResolvedValue(user);

        const result = await service.findOne(userId);
        expect(result).toEqual(user);
        expect(mockModel.findById).toHaveBeenCalledWith(userId);
        });
    });
    /*
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
        expect(result).toEqual(updatedUser);
        expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(userId, updatedUser, { new: true });
        });
    });
    /*
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
    */
});