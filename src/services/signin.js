import request from '../utils/request';

//发出注册请求
export async function signin(params) {
  return request('/api/signin/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),         
  });
}

export async function checkNickname(params) {
  return request('/api/checkNickname/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),         
  });
}

export async function checkEmail(params) {
  return request('/api/checkEmail/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),         
  });
}