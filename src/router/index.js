import Vue from 'vue'
import Router from 'vue-router'

//index组
const Home = r => require.ensure([], () => r(require('@/components/Home')), 'index')
const Single = r => require.ensure([], () => r(require('@/components/Single')), 'index')
const ShopCar = r => require.ensure([], () => r(require('@/components/ShopCar')), 'index')
const Me = r => require.ensure([], () => r(require('@/components/Me')), 'index')
const Login = r => require.ensure([], () => r(require('@/components/Login')), 'index')
const Key = r => require.ensure([], () => r(require('@/components/Key')), 'index')

//个人中心组
const MyBrand = r => require.ensure([], () => r(require('@/components/MyBrand')), 'my')
const MyBalance = r => require.ensure([], () => r(require('@/components/MyBalance')), 'my')
const MyCoupon = r => require.ensure([], () => r(require('@/components/MyCoupon')), 'my')
const MyCouponExchange = r => require.ensure([], () => r(require('@/components/MyCouponExchange')), 'my')
const MyLove = r => require.ensure([], () => r(require('@/components/MyLove')), 'my')
const MyMessage = r => require.ensure([], () => r(require('@/components/MyMessage')), 'my')
const MyAddress = r => require.ensure([], () => r(require('@/components/MyAddress')), 'my')
const MyAddressAdd = r => require.ensure([], () => r(require('@/components/MyAddressAdd')), 'my')
const MyOrder = r => require.ensure([], () => r(require('@/components/MyOrder')), 'my')
const MyPoint = r => require.ensure([], () => r(require('@/components/MyPoint')), 'my')
const MySetting = r => require.ensure([], () => r(require('@/components/MySetting')), 'my')
const MyDistribution = r => require.ensure([], () => r(require('@/components/MyDistribution')), 'my')
const MyDistributionQrcode = r => require.ensure([], () => r(require('@/components/MyDistributionQrcode')), 'my')
const MyDistributionStream = r => require.ensure([], () => r(require('@/components/MyDistributionStream')), 'my')
const MyDistributionTeam = r => require.ensure([], () => r(require('@/components/MyDistributionTeam')), 'my')
const MyDistributionWithdraw = r => require.ensure([], () => r(require('@/components/MyDistributionWithdraw')), 'my')

//商品组
const Sort = r => require.ensure([], () => r(require('@/components/Sort')), 'goods')
const GoodDetail = r => require.ensure([], () => r(require('@/components/GoodDetail')), 'goods')
const Search = r => require.ensure([], () => r(require('@/components/Search')), 'goods')
const Order = r => require.ensure([], () => r(require('@/components/Order')), 'goods')
const OrderComment = r => require.ensure([], () => r(require('@/components/OrderComment')), 'goods')
const OrderDetail = r => require.ensure([], () => r(require('@/components/OrderDetail')), 'goods')
const OrderLogistics = r => require.ensure([], () => r(require('@/components/OrderLogistics')), 'goods')
const OrderPay = r => require.ensure([], () => r(require('@/components/OrderPay')), 'goods')
const OrderPaySuccess = r => require.ensure([], () => r(require('@/components/OrderPaySuccess')), 'goods')
const OrderPayFail = r => require.ensure([], () => r(require('@/components/OrderPayFail')), 'goods')
const OrderReturn = r => require.ensure([], () => r(require('@/components/OrderReturn')), 'goods')
const BrandStreet = r => require.ensure([], () => r(require('@/components/BrandStreet')), 'goods')

//import Home from '@/components/Home'
//import Single from '@/components/Single'
//import ShopCar from '@/components/ShopCar'
//import Me from '@/components/Me'
//import MyBrand from '@/components/MyBrand'
//import MyBalance from '@/components/MyBalance'
//import MyCoupon from '@/components/MyCoupon'
//import MyCouponExchange from '@/components/MyCouponExchange'
//import MyDistribution from '@/components/MyDistribution'
//import MyDistributionQrcode from '@/components/MyDistributionQrcode'
//import MyDistributionStream from '@/components/MyDistributionStream'
//import MyDistributionTeam from '@/components/MyDistributionTeam'
//import MyDistributionWithdraw from '@/components/MyDistributionWithdraw'
//import MyLove from '@/components/MyLove'
//import MyMessage from '@/components/MyMessage'
//import MyAddress from '@/components/MyAddress'
//import MyAddressAdd from '@/components/MyAddressAdd'
//import MyOrder from '@/components/MyOrder'
//import MyPoint from '@/components/MyPoint'
//import MySetting from '@/components/MySetting'
//import Sort from '@/components/Sort'
//import GoodDetail from '@/components/GoodDetail'
//import Order from '@/components/Order'
//import OrderComment from '@/components/OrderComment'
//import OrderDetail from '@/components/OrderDetail'
//import OrderLogistics from '@/components/OrderLogistics'
//import OrderPay from '@/components/OrderPay'
//import OrderPaySuccess from '@/components/OrderPaySuccess'
//import OrderPayFail from '@/components/OrderPayFail'
//import OrderReturn from '@/components/OrderReturn'
//import Login from '@/components/Login'
//import Key from '@/components/Key'
//import Search from '@/components/Search'
//import BrandStreet from '@/components/BrandStreet'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        auth: true,
        keep: true,
      }
    }, {
      path: '/single',
      name: 'single',
      component: Single,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/shopCar',
      name: 'shopCar',
      component: ShopCar,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/me',
      name: 'me',
      component: Me,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/balance',
      name: 'myBalance',
      component: MyBalance,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/brand',
      name: 'myBrand',
      component: MyBrand,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/my/coupon',
      name: 'myCoupon',
      component: MyCoupon,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/my/coupon/exchange',
      name: 'myCouponExchange',
      component: MyCouponExchange,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/my/distribution',
      name: 'myDistribution',
      component: MyDistribution,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/distribution/qrcode',
      name: 'myDistributionQrcode',
      component: MyDistributionQrcode,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/distribution/stream',
      name: 'myDistributionStream',
      component: MyDistributionStream,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/distribution/team',
      name: 'myDistributionTeam',
      component: MyDistributionTeam,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/distribution/withdraw',
      name: 'myDistributionWithdraw',
      component: MyDistributionWithdraw,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/my/love',
      name: 'myLove',
      component: MyLove,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/my/message',
      name: 'myMessage',
      component: MyMessage,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/address',
      name: 'myAddress',
      component: MyAddress,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/address/add',
      name: 'myAddressAdd',
      component: MyAddressAdd,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/point',
      name: 'myPoint',
      component: MyPoint,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/my/order',
      name: 'myOrder',
      component: MyOrder,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/my/setting',
      name: 'mySetting',
      component: MySetting,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/sort',
      name: 'sort',
      component: Sort,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/goodDetail',
      name: 'goodDetail',
      component: GoodDetail,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/detail',
      name: 'orderDetail',
      component: OrderDetail,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/comment',
      name: 'orderComment',
      component: OrderComment,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/logistics',
      name: 'orderLogistics',
      component: OrderLogistics,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/pay',
      name: 'orderPay',
      component: OrderPay,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/pay/success',
      name: 'orderPaySuccess',
      component: OrderPaySuccess,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/pay/fail',
      name: 'orderPayFail',
      component: OrderPayFail,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/order/return',
      name: 'orderReturn',
      component: OrderReturn,
      meta: {
        auth: true,
        keep: false
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    }, {
      path: '/key',
      name: 'key',
      component: Key,
      meta: {
        auth: false
      }
    }, {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '/brandStreet',
      name: 'brandStreet',
      component: BrandStreet,
      meta: {
        auth: true,
        keep: true
      }
    }, {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

//登录验证
router.beforeEach((to, from, next) => {
  //需要验证且没有token，跳转到登陆页面
  if (to.meta.auth && !window.localStorage.access_token) {
    next({
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router
