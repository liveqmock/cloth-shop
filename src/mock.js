let Mock = require('mockjs');
//商品
let goodsList = [{
  title: '@ctitle(20,30)',
  final_price: '@integer(1,4999)',
  market_price: '@integer(5000,9999)',
  sale_count: '@integer(1,999)',
  is_new: '@integer(0,1)',
  number: '@integer(1,99)',
  thumb_200: '/static/goods/goods (@integer(1,18)).jpg',
  avatar: '/static/goods/goods (@integer(1,18)).jpg',
  'goods_attr_arr|1-3': [{
    attr_value: '@ctitle(2,4)',
    attr_name: '@ctitle(2,4)',
  }]
}]
//品牌
let brandList = [{
  name: '@ctitle(2,4)',
  thumb: '/static/brand/brand (@integer(1,8)).png'
}]
//分类
let category = [{
  cat_name: '@ctitle(2,4)',
  'child|4-20': [{
    cat_name: '@ctitle(2,4)',
    cat_id: '@integer(1,9999)'
  }]
}]
//优惠券
let coupon = [{
  money: '@integer(50,100)',
  money_limit: '@integer(1,50)',
  coupon_name: '@ctitle(2,4)',
  start_time_format: '@date("yyyy-yy-y")',
  end_time_format: '@date("yyyy-yy-y")',
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
      sex_zh: /[男女]/,
      phone: /((188)|(133)|(156))\d{8}/
    },
    points: '@integer(1,99999)',
    balance: '@integer(1,99999)',
    coupon: '@integer(1,99)',
    sign: '@integer(1,31)',
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
//更新个人数据
Mock.mock(/\/user\/update/, {
  code: /(200)|(400)/,
  msg: '@csentence(10,20)',
})
//获取积分兑换数据
Mock.mock(/\/goods\/point/, {
  code: /(200)|(400)/,
  'goods|20': goodsList,
})
//签到
Mock.mock(/\/user\/sign/, {
  code: /(200)|(400)/,
  'msg': '@ctitle(10,20)',
})
//兑换优惠券
Mock.mock(/\/user\/exchange/, {
  code: /(200)|(400)/,
  'msg': '@ctitle(10,20)',
})
//优惠券
Mock.mock(/\/user\/coupon/, {
  code: 200,
  coupon: {
    'use|10': coupon,
    'used|10': coupon,
    'out_date|10': coupon,
  },
})
//商品详情
Mock.mock(/\/goods\/detail/, {
  code: 200,
  goods: {
    'thumb_400': '/static/goods/goods (@integer(1,18)).jpg',
    'title': '@ctitle(10,20)',
    'final_price': '@integer(1,499)',
    'market_price': '@integer(500,999)',
    'sale_count': '@integer(0,999)',
    'brand_name': '@ctitle(2,5)',
    'content|7': ['/static/detail/detail (@integer(1,7)).jpg']
  },
  display: '',
  'attribute|1-3': [{
    attr_name: '@ctitle(2,4)',
    'attr_detail|1-3': [{
      attr_value: '@ctitle(2,4)',
      goods_attr_id: '@integer(1,99999)'
    }]
  }],
  store: '@integer(0,1)',
})
Mock.mock(/\/goods\/get_comment/, {
  code: 200,
  'comment|1-20': [{
    'avatar': '/static/headlike/headlike (@integer(1,2)).png',
    'nickname': '@cname(2,5)',
    'ctime_format': '@date("yyyy-yy-y")',
    'market_price': '@integer(500,999)',
    'attr_format|1-3': [{
      attr_name: '@ctitle(2,4)',
      attr_value: '@ctitle(2,4)'
    }],
    'content': '@ctitle(10,20)',
    'thumb_arr|1-5': ['/static/detail/detail (@integer(1,7)).jpg']
  }],
})
//收藏商品
Mock.mock(/\/goods\/store/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//加入购物车
Mock.mock(/\/goods\/add_to_cart/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//获取订单信息
Mock.mock(/\/order\/preview/, {
  code: 200,
  msg: '@ctitle(2,4)',
  'order|1-3': [{
    avatar: '/static/brand/brand (@integer(1,8)).png',
    brand: '@ctitle(2,4)',
    'goods|1-3': goodsList,
  }],
  'address|0-5': [{
      consignee:'@cname(2,4)',
      tel: /((188)|(133)|(156))\d{8}/,
      province_zh: '@province',
      city_zh: '@city',
      district_zh: '@county',
      address: '@ctitle(5,15)',
  }]
})
Mock.mock(/\/order\/submit/,{
    code:200,
    trade_no:/\w{5}\d{20}/,
    goods_total:'@integer(99,99999)',
    number_total:'@integer(1,99)',
    msg:'@ctitle(2,4)',
})

export default Mock
