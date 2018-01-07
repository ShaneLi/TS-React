import {TopProp} from "../model/pageModel";
import {PostService} from "../service/postService";
import {BaseModel} from "../framework/baseModel";
import {ModelControl} from "../framework/control/modelControl";
import {SubControl} from "./subControl";
import {RootProps} from "../framework/control/rootControl";
import {Bind} from "../framework/utils/annotations";

export class Post {
  constructor(public id: number,
              public userId: number,
              public title: string,
              public body: string) {
  }
}

export interface TopState{
  count?: number;
  response?: Array<Post>;
}

export class TopControl extends ModelControl<TopProp, TopState> {
  public subControl: SubControl;
  public service: PostService;

  constructor(model: BaseModel<TopProp>,
              rootProps: RootProps) {
    super(model.namespace, rootProps.dispatch);

    this.subControl = this.addControl(new SubControl());
    this.service = new PostService(rootProps.dependency.webService);
  }

  public initialState(): TopState {
    return {count: 0, response: []};
  }

  public get loaded(): string {
    return TopControl.booleanToString(this.prop.loaded);
  }

  public get loading(): string {
    return TopControl.booleanToString(this.prop.loading);
  }

  @Bind
  public clear(): Promise<any> {
    this.updateState(state =>
      ({count : state.count + 1, response: []})
    );
    return this.setProp({loaded: false});
  }

  @Bind
  public async fetch(): Promise<any> {
    await this.showLoading();
    let response: Array<Post> = await this.service.getPosts();
    this.setState({response: response.slice(0, 3)});
    await this.hideLoading();
  }

  @Bind
  public async post(): Promise<any> {
    await this.showLoading();
    let response: Post = await this.service.putPost();
    await this.updateStateAsync(() => ({response: [response]}));
    await this.hideLoading();
  }

  private showLoading(): Promise<any> {
    return this.setProp({loading: true, loaded: false});
  }

  private hideLoading(): Promise<any> {
    return this.setProp({loading: false, loaded: true});
  }

  private static booleanToString(value: Boolean): string {
    return value ? "true" : "false"
  }
}

