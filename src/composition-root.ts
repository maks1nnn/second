import "reflect-metadata"
import { Container } from "inversify";
import { UsersControllers } from "./users/controllers/usersControllers";
import { UserRepository } from "./users/repository/userMongoRepository";
import { UserServise } from "./users/service/user-servise";
import { PostRepository } from "./posts/repository/postMongo-repositories";
import { PostServise } from "./posts/service/post-servise";
import { PostControllers } from "./posts/controllers/postControllaers";
import { CommentRepository } from "./comments/repository/commentMongoRepositories";
import { CommentService } from "./comments/servise/comment-servise";
import { CommentControllers } from "./comments/controllers/commentControllers";
import { BlogRepository } from "./blog/repository/blogMongo-repositories";
import { BlogServise } from "./blog/service/blog-servise";
import { BlogControllers } from "./blog/controllers/blogControllers";
import { IpControlRepository } from "./security/repository/ipRepository";
import { SecurityService } from "./security/servise/security-servise";
import { SecurityControllers } from "./security/controllers/securityControllers";
import { AuthServise } from "./auth/servise/authRegister-servise";
import { LoginServise } from "./auth/servise/authLogin-servise";
import { RegisterControllers } from "./auth/controllers/registerControllers";
import { LoginControllers } from "./auth/controllers/loginControllers";

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

container.bind(CommentRepository).to(CommentRepository)
container.bind(CommentService).to(CommentService)
container.bind(CommentControllers).to(CommentControllers)

container.bind(BlogRepository).to(BlogRepository)
container.bind(BlogServise).to(BlogServise)
container.bind(BlogControllers).to(BlogControllers)

container.bind(IpControlRepository).to(IpControlRepository)
container.bind(SecurityService).to(SecurityService)
container.bind(SecurityControllers).to(SecurityControllers)

container.bind(AuthServise).to(AuthServise)
container.bind(LoginServise).to(LoginServise)
container.bind(RegisterControllers).to(RegisterControllers)
container.bind(LoginControllers).to(LoginControllers)