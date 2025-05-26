// import {
//   Body,
//   Controller,
//   Get,
//   Path,
//   Post,
//   Query,
//   Route,
//   SuccessResponse
// } from 'tsoa'
// import { CommandBus } from '../../../../Shared/domain/CommandBus'
// import { QueryBus } from '../../../Shared/domain/QueryBus'
// import { CreateUserCommand } from '../../application/Create/CreateUserCommand'
// import { GetUserQuery } from '../../application/Get/GetUserQuery'
// import { ListUsersQuery } from '../../application/List/ListUsersQuery'
// import { InMemoryUserRepository } from '../Persistance/InMemoryUserRepository'

// @Route('users')
// export class UserController extends Controller {
//   constructor() {
//     super()
//     const repository = new InMemoryUserRepository()
//     this.commandBus = new CommandBus()
//     this.queryBus = new QueryBus()
//   }

//   private readonly commandBus: CommandBus
//   private readonly queryBus: QueryBus

//   @Get()
//   public async getUsers(): Promise<Record<string, unknown>[]> {
//     const query = new ListUsersQuery()
//     return this.queryBus.ask(query)
//   }

//   @Get('{id}')
//   public async getUserById(@Path() id: string): Promise<Record<string, unknown>> {
//     const query = new GetUserQuery({ id })
//     return this.queryBus.ask(query)
//   }

//   @Post()
//   @SuccessResponse('201', 'Created')
//   public async createUser(
//     @Body() requestBody: { name: string; email: string; password: string }
//   ): Promise<void> {
//     const command = new CreateUserCommand({
//       name: requestBody.name,
//       email: requestBody.email,
//       password: requestBody.password
//     })
//     await this.commandBus.dispatch(command)
//   }
// }
