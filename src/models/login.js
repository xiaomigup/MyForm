import {login} from '../services/login';
import {routerRedux} from 'dva/router';

export default {
  namespace : 'login',
  state : {
    loginLoading: false
  },
  reducers : {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true
      };
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false
      };
    }
  },
  effects : {
    *login({
      payload
    }, {put, call}) {
      yield put({type: 'showLoginLoading'});
      const data = yield call(login, payload);
      yield put({type: 'hideLoginLoading'});
      console.log(data);
      if (data.data && data.data.success) {
        localStorage.setItem('user', JSON.stringify({nickname: payload.nickname, email: payload.email, password: payload.password, deadline: data.data.deadline}));
        // yield put({ type: 'app/queryUser' });
        yield put(routerRedux.push('/'));

      } else {
        throw '用户名或密码错误';
      }
    }
  },
  subscriptions : {}
};
