import {SubControl} from "../../control/SubControl";
import {MockModel} from "../framework/mock/MockModel";

describe('test Sub control', () => {
  let model: MockModel;
  let control: SubControl;

  beforeEach(() => {
    model = new MockModel();
    control = new SubControl();
    model.attachControl(control, { count: 0 });
  });

  it('should have initial value', function () {
    expect(control.props.count).toEqual(0);
  });

  it('should increment count', function () {
    control.increment();
    control.increment();

    model.dispatchAllExisting();
    expect(control.props.count).toEqual(2);
  });
});
