let Mock = require('mockjs');


Mock.mock(/\/user\/login/, {
  code: 200,
  msg: '登陆成功',
  key: Mock.mock('@string(32)'),
})
export default Mock
