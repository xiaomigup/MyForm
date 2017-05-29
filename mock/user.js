// 存放用户登录信息
const users = [{
  nickname:"0",
  email:"0@qq.com",
  password: '0'
}];

module.exports = {
    // 注册接口
  'POST /api/signin': function (req, res) {
    const user = req.body;
    let data;
    delete user.confirm;
    const test = users.some((item) => {
       return  item.nickname === user.nickname ||
            item.email === user.email;
    });
    if (test) {
      data = -1;// 已有这个用户
      res.json({ data });
    } else {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      data = 1;// 注册成功
      users.push(user);
      res.json({ data, deadline: now.getTime() });
    }
  },

  'POST /api/checkNickname': function (req, res) {
    const user = req.body;
    let data;
    const test = users.some((item) => {
        return item.nickname == user.nickname 
    });
    if (test) {
      data = -1;// 用户名被占用
    } else {
      data = 1;// 用户名可以使用
    }
    res.json({ data});
  },
  
  'POST /api/checkEmail': function (req, res) {
    const user = req.body;
    let data;
    const test = users.some((item) => {
        return item.email.toLowerCase() === user.email.toLowerCase() 
    });
    if (test) {
      data = -1;// 邮箱被注册
    } else {
      data = 1;// 邮箱可以使用
    }
    res.json({ data});
  },
  'POST /api/login': function (req, res) {
    const { username, password } = req.body;
    const user = users.filter(item => item.username === username);
    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.json({ success: true, message: 'Ok', deadline: now.getTime() });
    } else {
      res.status(400).end(encodeURI('用户名或密码错误'));
    }
  },
};
