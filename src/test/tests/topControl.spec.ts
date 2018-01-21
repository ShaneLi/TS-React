import {MockModel} from "../framework/mock/MockModel";
import {Post, TopControl} from "../../control/TopControl";
import {MockWebService} from "../framework/mock/MockWebService";

describe('test Sub control', () => {
  let model: MockModel;
  let control: TopControl;
  let service: MockWebService;
  let posts: Array<Post> = [
    new Post(1, 1, "title1", "body1"),
    new Post(2, 2, "title2", "body2")
  ];

  beforeEach(() => {
    model = new MockModel();
    control = new TopControl(model, model);
    service = model.dependency.webService;
    model.attachControl(control, { count: 0 });
  });

  it('should be able to call server', async function () {
    control.fetch();
    await model.dispatchAll();

    expect(control.props.loading).toBeTruthy();
    expect(control.props.loaded).toBeFalsy();

    await service.expectSingleRequest("posts").respond(posts);
    await model.dispatchAll();

    expect(control.props.loading).toBeFalsy();
    expect(control.props.loaded).toBeTruthy();
    expect(model.getState(control).response).toEqual(posts);
  });


  it('should be able to post', async function () {
    control.post();
    await model.dispatchAll();

    expect(control.props.loading).toBeTruthy();
    expect(control.props.loaded).toBeFalsy();

    let request = service.expectSingleRequest("posts");
    expect(request.data.id).toEqual(8888);
    let result = await request.respondAndWaitForResult(posts[1], model);
    expect(result).toEqual(posts[1]);

    expect(control.props.loading).toBeFalsy();
    expect(control.props.loaded).toBeTruthy();
    expect(model.getState(control).response).toEqual([posts[1]]);
  })
});

