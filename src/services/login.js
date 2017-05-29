import request from '../utils/request';

//发出注册请求
export async function login(params) {
  return request('/api/login/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)      
  });
}