let Mock = require('mockjs');


Mock.mock(/\/user\/login/, {
  code: 200,
  msg: '登陆成功',
  key: Mock.mock('@string(32)'),
})
Mock.mock(/\/user\/index/, {
  code: 200,
  msg: '登陆成功',
  key: Mock.mock('@string(32)'),
})
Mock.mock(/\/index\/index/, {
  code: 200,
  'goods|10-50': [{
    title: '@ctitle',
    final_price: '@integer(1,9999)',
    market_price: '@integer(1,9999)',
    sale_count: '@integer(1,999)',
    is_new: '@integer(0,1)',
    thumb_200: '/static/goods/goods (@integer(0,21)).jpg'
  }],
  brand: '',
  'advertise': [{
      thumb: `/static/banner0.jpg`
    },
    {
      thumb: `/static/banner1.jpg`
    },
    {
      thumb: `/static/banner2.jpg`
    },
  ],
})
export default Mock
