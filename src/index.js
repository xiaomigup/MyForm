import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(error) {
        message.error(error.message);
    },
});

app.model(require("./models/signin"));

app.model(require("./models/formModel"));

app.model(require("./models/login"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
