import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload()  Payload: any) {
    return this.userService.update(Payload.id, Payload.userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }
  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload): Promise<any>{
    const user = await this.userService.findByUsername(payload.username);
    const isValidPassword =  await this.userService.checkPassword(payload.password, user.password);
    if(user && isValidPassword) {
            return user;  
    }
    
    return null;

}

}
