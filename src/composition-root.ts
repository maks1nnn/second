import "reflect-metadata"
import { Container } from "inversify";
import { UsersControllers } from "./users/controllers/usersControllers";
import { UserRepository } from "./users/repository/userMongoRepository";
import { UserServise } from "./users/service/user-servise";
import { PostRepository } from "./posts/repository/postMongo-repositories";
import { PostServise } from "./posts/service/post-servise";
import { PostControllers } from "./posts/controllers/postControllaers";

/*const userRepository = new UserRepository()
const userServise = new UserServise(userRepository)
export const usersControllers = new UsersControllers(userServise)*/

export const container = new Container();

container.bind(UsersControllers).to(UsersControllers)
container.bind(UserServise).to(UserServise)
container.bind(UserRepository)

container.bind(PostRepository).to(PostRepository)
container.bind(PostServise).to(PostServise)
container.bind(PostControllers).to(PostControllers)