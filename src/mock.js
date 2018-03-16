let Mock = require('mockjs');
//商品列表
let goodsList = [
  {
    title: '@ctitle(20,30)',
    final_price: '@integer(1,4999)',
    market_price: '@integer(5000,9999)',
    sale_count: '@integer(1,999)',
    is_new: '@integer(0,1)',
    thumb_200: '/static/goods/goods (@integer(1,18)).jpg'
  }
]
//品牌列表
let brandList = [
  {
    name: '@ctitle(2,4)',
    thumb: '/static/brand/brand (@integer(1,8)).png'
  }
]
//登陆
Mock.mock(/\/user\/login/, {
  code: 200,
  msg: '登陆成功',
  key: Mock.mock('@string(32)')
})
//获取个人信息
Mock.mock(/\/user\/index/, {
  code: 200,
  msg: '登陆成功',
  key: Mock.mock('@string(32)')
})
//活动商城首页数据
Mock.mock(/\/index\/index/, {
  code: 200,
  'goods|20': goodsList,
  'brand|8': brandList,
  'keyword|1-20':['@ctitle(2,4)'],
  'advertise': [
    {
      thumb: `/static/banner0.jpg`
    }, {
      thumb: `/static/banner1.jpg`
    }, {
      thumb: `/static/banner2.jpg`
    }
  ]
})
//商品搜索数据
Mock.mock(/\/goods\/search/, {
  code: 200,
  'goods|20': goodsList
})
//商品搜索数据
Mock.mock(/\/index\/brand/, {
  code: 200,
  'brand|48': brandList
})
export default Mock
