let Mock = require('mockjs');
//商品
let goodsList = [{
  title: '@ctitle(20,30)',
  goods_name: '@ctitle(20,30)',
  goods_num: '@integer(1,99)',
  apply_status: '@integer(0,1)',
  goods_status: '@integer(0,1)',
  goods_price: '@integer(1,999)',
  final_price: '@integer(1,4999)',
  market_price: '@integer(5000,9999)',
  sale_count: '@integer(1,999)',
  is_new: '@integer(0,1)',
  number: '@integer(1,99)',
  count: '@integer(1,99)',
  goods_id: '@id',
  check: false,
  thumb_200: '/static/goods/goods (@integer(1,18)).jpg',
  avatar: '/static/goods/goods (@integer(1,18)).jpg',
  'goods_attr_arr|1-3': [{
    attr_value: '@ctitle(2,4)',
    attr_name: '@ctitle(2,4)',
  }],
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
//地址
let address = [{
  id: '@id',
  consignee: '@cname(2,4)',
  tel: /((188)|(133)|(156))\d{8}/,
  province_zh: '@province',
  city_zh: '@city',
  district_zh: '@county',
  address: '@ctitle(5,15)',
}]
//订单
let order = [{
  id: '@id',
  add_time: '@date("yyyy-yy-y") @time',
  update_time: '@date("yyyy-yy-y") @time',
  order_status_zh: /(待付款)|(待发货)|(待收货)|(待评价)|(已取消)|(已完成)/,
  'goods|1-3': goodsList,
  pay_fee: '@integer(1,99999)',
  button_status: '@integer(0,5)',
  delivery_name:'@cname(4)',
  shipping_no:/\w{5}\d{10}/,
  order_no:/\w{5}\d{10}/,
  phone:/((188)|(133)|(156))\d{8}/,
  consignee:'@cname(2,4)',
  detail:'@county(true) @ctitle(4,20)',
  avatar:'/static/brand/brand (@integer(1,8)).png',
  name:'@ctitle(2,4)',
  button_status:'@integer(1,5)',
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
  'address|0-5': address
})
//提交订单
Mock.mock(/\/order\/submit/, {
  code: 200,
  trade_no: /\w{5}\d{20}/,
  goods_total: '@integer(99,99999)',
  number_total: '@integer(1,99)',
  msg: '@ctitle(2,4)',
})
//获取购物车
Mock.mock(/\/user\/cart/, {
  code: 200,
  'goods|1-3': [{
    avatar: '/static/brand/brand (@integer(1,8)).png',
    name: '@ctitle(2,4)',
    'goods|1-3': goodsList,
  }],
})
//商品移出购物车
Mock.mock(/\/user\/remove_cart/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//添加收货地址
Mock.mock(/\/user\/add_address/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
  address: address[0]
})
//获取省市区
Mock.mock(/\/api\/get_area/, {
  code: /(200)/,
  'area|2-34': [{
    region_name: '@province',
    region_type: '@integer(1,3)'
  }],
})
//获取代理数据
Mock.mock(/\/agency\/index/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  agency_info: {
    type: /(金牌代理)/,
    money: '@integer(99,9999)',
    order: {
      total: '@integer(99,9999)',
      count: '@integer(1,99)'
    }
  },
})
//获取代理数据
Mock.mock(/\/agency\/apply/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  trade_no: /\w{5}\d{20}/,
})
//获取二维码
Mock.mock(/\/user\/promotion/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  image: '/static/qrcode.png',
})
//我的团队
Mock.mock(/\/agency\/team/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  'team|2-20': [{
    avatar: '/static/headlike/headlike (@integer(1,2)).png',
    nickname: '@cname(2,5)',
    count: '@integer(2,20)',
    commission: '@integer(99,99999)',
    phone: /((188)|(133)|(156))\d{8}/
  }],
})
//申请提现
Mock.mock(/\/agency\/withdraw/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//移出收藏
Mock.mock(/\/user\/remove_store/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//申请入驻
Mock.mock(/\/user\/enter/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//设置默认地址
Mock.mock(/\/user\/set_default/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//移出地址
Mock.mock(/\/user\/remove_address/, {
  code: /(200)|(400)/,
  msg: '@ctitle(2,4)',
})
//地址列表
Mock.mock(/\/user\/address/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  'address|4-10': address
})
//我的收藏
Mock.mock(/\/user\/store/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  'goods|10-20': goodsList,
  total_count: '@integer(20,40)',
  promotion_count: '@integer(10,20)',
})
//我的订单
Mock.mock(/\/user\/order/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  'order|10-20': order,
})
//我的订单详情
Mock.mock(/\/order\/detail/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  order: order[0],
  service_tel:/((188)|(133)|(156))\d{8}/,
  'goods|1-3':goodsList,
})
//确认订单
Mock.mock(/\/order\/confirm/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
})
//支付订单
Mock.mock(/\/order\/verify/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  trade_no:/\w{5}\d{10}/,
})
//我的订单
Mock.mock(/\/order\/delivery/, {
  code: /(200)/,
  msg: '@ctitle(2,4)',
  'goods|1-9':goodsList,
  order:order[0],
  'delivery|1-5':[{
      context:'@csentence',
      ctime:'@date("yyyy-yy-y") @time("HH:mm:ss")',
  }],
  count:'@integer(1,99)',
})


export default Mock
