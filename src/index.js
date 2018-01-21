import dva from 'dva';
import './index.html';
import router from './router';

import {PageModel} from './model/PageModel';
import {DependencyModel} from './framework/DependencyModel';

// local global style
require('./index.less');

// 1, initialize dva
const app = dva();

// 2. install plugins
//app.use({});

// 3. register models
app.model(PageModel);
app.model(DependencyModel);

// 4. register routing
app.router(router);

// 5. start application
app.start('#root');
