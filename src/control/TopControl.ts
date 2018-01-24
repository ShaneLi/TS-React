import {TopProp} from "../model/PageModel";
import {PostService} from "../service/PostService";
import {BaseModel} from "../framework/BaseModel";
import {ModelControl} from "../framework/control/ModelControl";
import {SubControl} from "./SubControl";
import {RootProps} from "../framework/control/RootControl";
import {Bind} from "../framework/utils/Annotations";
import {WithId} from "../framework/interface/WithId";

export class Post implements WithId {
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
    return TopControl.booleanToString(this.props.loaded);
  }

  public get loading(): string {
    return TopControl.booleanToString(this.props.loading);
  }

  @Bind
  public clear(): Promise<any> {
    this.updateState(state =>
      ({count : state.count + 1, response: []})
    );
    return this.setProps({loaded: false});
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
    return this.setProps({loading: true, loaded: false});
  }

  private hideLoading(): Promise<any> {
    return this.setProps({loading: false, loaded: true});
  }

  private static booleanToString(value: Boolean): string {
    return value ? "true" : "false"
  }
}

