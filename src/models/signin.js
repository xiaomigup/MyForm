import { signin, checkNickname, checkEmail } from '../services/signin';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'signin',
  state: {
    signining: false,
  },
  reducers: {
    showSigninLoading(state) {
      return {
        ...state,
        signining: true,
      };
    },
    hideSigninLoading(state) {
      return {
        ...state,
        signining: false,
      };
    },
  },
  effects: {
    *checkNickname({
      payload,
    }, { put, call }) {
      const data = yield call(checkNickname, payload);
      if (data.data.data == -1) {
        throw "用户名被占用";
      }
    },

    *checkEmail({
      payload,
    }, { put, call }) {
      const data = yield call(checkEmail, payload);
      if (data.data.data == -1) {
        throw '邮箱被注册';
      }
    },
    *signin({
          payload,
        }, { put, call }) {
      yield put({ type: 'showSigninLoading' });
      const data = yield call(signin, payload);
      yield put({ type: 'hideSigninLoading' });
      if (data.data.data == 1) {
        localStorage.setItem('user', JSON.stringify({ nickname: payload.nickname, email: payload.email, password: payload.password }));      
        yield put(routerRedux.push('/'));
      } else {
        console.log(11111, data);
                // data.data = "用户名或密码错误"
        throw "用户名已占用";
      }
    },

  },
};
