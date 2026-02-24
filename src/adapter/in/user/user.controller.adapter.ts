import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "src/application/dto/user/create-user.dto";
import { ListUserDto } from "src/application/dto/user/list-user.dto";
import { UpdateUserDto } from "src/application/dto/user/update-user.dto";
import { PaginatedResponseMapper } from "src/application/mapper/paginate/paginated-response.mapper.dto";
import { UserHttpMapper } from "src/application/mapper/user/user-http.mapper";
import { CreateUserUseCase } from "src/application/use_case/user/create-user.usecase";
import { DeleteUserUseCase } from "src/application/use_case/user/delete-user.usecase";
import { GetUserUseCase } from "src/application/use_case/user/get-user.usecase";
import { ListUserUseCase } from "src/application/use_case/user/list-user.usecase";
import { UpdateUserUseCase } from "src/application/use_case/user/update-user.usecase";


@Controller(':user')
export class UserControllerAdapter {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly listUser: ListUserUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const result = await this.createUser.execute(
      UserHttpMapper.toCreateCommand(dto)
    );

    return UserHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {

    const result = await this.getUser.execute({ publicId });

    return UserHttpMapper.toResponse(result!);
  }

  @Get()
  async list(@Query() dto: ListUserDto) {
    const query = UserHttpMapper.toListQuery(dto);

    const result = await this.listUser.execute(query);

    return PaginatedResponseMapper.toPaginatedDto(
      result, 
      UserHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() dto: UpdateUserDto) {
    const command = UserHttpMapper.toUpdateCommand(dto);
    const result = await this.updateUser.execute({ publicId }, command);

    return UserHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    this.deleteUser.execute({ publicId });

    return { message: "User deleted successfully" };
  }
}
