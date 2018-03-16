let Mock = require('mockjs');
//商品列表
let goodsList = [{
  title: '@ctitle(20,30)',
  final_price: '@integer(1,4999)',
  market_price: '@integer(5000,9999)',
  sale_count: '@integer(1,999)',
  is_new: '@integer(0,1)',
  thumb_200: '/static/goods/goods (@integer(1,18)).jpg'
}]
//品牌列表
let brandList = [{
  name: '@ctitle(2,4)',
  thumb: '/static/brand/brand (@integer(1,8)).png'
}]
let category = [{
  cat_name: '@ctitle(2,4)',
  'child|4-20': [{
    cat_name: '@ctitle(2,4)',
    cat_id: '@integer(1,9999)'
  }]
}]
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
  info: {
    user: {
      avatar: '',
      nickname: '@cname(2,5)',
      type_zh: '金牌会员',
      sex_zh:/[男女]/,
      phone:/((188)|(133)|(156))\d{8}/
    },
    points: '@integer(1,99999)',
    balance: '@integer(1,99999)',
    coupon: '@integer(1,99)',
  },
})
//活动商城首页数据
Mock.mock(/\/index\/index/, {
  code: 200,
  'goods|20': goodsList,
  'brand|8': brandList,
  'keyword|1-20': ['@ctitle(2,4)'],
  'advertise': [{
    thumb: `/static/banner0.jpg`
  }, {
    thumb: `/static/banner1.jpg`
  }, {
    thumb: `/static/banner2.jpg`
  }]
})
//商品搜索数据
Mock.mock(/\/goods\/search/, {
  code: 200,
  'goods|20': goodsList
})
//单品分类数据
Mock.mock(/\/index\/category/, {
  code: 200,
  'category|48': category
})
//消息数据
Mock.mock(/\/user\/notify/, {
  code: 200,
  'notify|1-20': [{
    redirect: '',
    tag: '@ctitle(2,4)',
    title: '@ctitle(4,10)',
    ctime_format: '@date("yyyy-yy-y")',
    avatar: `/static/banner@integer(0,2).jpg`,
  }]
})
export default Mock
