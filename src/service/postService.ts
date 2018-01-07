import {BaseWebService} from "../framework/webService/baseWebService";
import {WebService} from "../framework/interface/webService";
import {PostDTO} from "../proto/generated/dto";
import {RoutingConfigs} from "../framework/webService/routingConfigs";
import {Post} from "../control/topControl";

export class PostService extends BaseWebService {
  constructor(service: WebService) {
    super(service, RoutingConfigs.withBase("https://jsonplaceholder.typicode.com"))
  }

  private static toPostDTO(value: Post): PostDTO {
    return PostDTO.create({id: value.id, userId: value.userId, title: value.title, body: value.body});
  }

  private static toPost(value: any): Post {
    let dto = PostDTO.fromObject(value);
    return new Post(dto.id, dto.userId, dto.title, dto.body)
  }

  private static toPosts(message: Array<any>): Array<Post> {
    return message.map(PostService.toPost);
  }

  public getPosts(): Promise<Array<Post>> {
    return super.get("posts").call(PostService.toPosts);
  }

  public putPost(): Promise<Post> {
    return super.post("posts").withData(
      new Post(8888, 1, "My Post Title","My Post Body"),
      PostService.toPostDTO
    ).call(PostService.toPost);
  }
}
