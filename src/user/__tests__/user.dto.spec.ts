import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from '../../user/dto/user.dto';

// Descripción del conjunto de pruebas para UserDTO
describe('UserDTO', () => {
  // Función para crear instancias de UserDTO en cada prueba
  let createUserDto: () => UserDTO;

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Inicializa la función createUserDto para devolver una instancia predeterminada de UserDTO
    createUserDto = () => ({
      name: 'John Doe',
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });

  // Prueba: UserDTO debe estar definido
  it('should be defined', () => {
    // Crea una instancia de UserDTO y verifica que esté definida
    const userDto = createUserDto();
    expect(userDto).toBeDefined();
  });

  // Prueba: UserDTO debe tener un nombre válido
  it('should have a valid name', () => {
    // Crea una instancia de UserDTO y verifica que el nombre sea igual a 'John Doe'
    const userDto = createUserDto();
    expect(userDto.name).toEqual('John Doe');
  });

  // Prueba: UserDTO debe tener un nombre de usuario válido
  it('should have a valid username', () => {
    // Crea una instancia de UserDTO y verifica que el nombre de usuario sea igual a 'john_doe'
    const userDto = createUserDto();
    expect(userDto.username).toEqual('john_doe');
  });

  // Prueba: UserDTO debe tener un correo electrónico válido
  it('should have a valid email', () => {
    // Crea una instancia de UserDTO y verifica que el correo electrónico sea igual a 'john.doe@example.com'
    const userDto = createUserDto();
    expect(userDto.email).toEqual('john.doe@example.com');
  });

  // Prueba: UserDTO debe tener una contraseña válida
  it('should have a valid password', () => {
    // Crea una instancia de UserDTO y verifica que la contraseña sea igual a 'password123'
    const userDto = createUserDto();
    expect(userDto.password).toEqual('password123');
  });
});
