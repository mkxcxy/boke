const router = require('koa-router')()
const {getPermissions, indexUrl} = require('./../config/configuration')

const {getUser, postUser, deleteUser, putUser,postUserInfo} = require('./index/users')
const {getType, postType, deleteType, putType} = require('./index/type')
const {getImage} = require('./index/image')
const {getAllPermissions} = require('./index/permissions')
const {postSwipt, deleteSwipt, putSwipt, getSwipt} = require('./index/swipt')
const {postNavbar, deleteNavbar, putNavbar, getNavbar} = require('./index/navbar')
const {getNew, postNew, putNew, deleteNew} = require('./index/new')
const {getFriendship, postFriendship, putFriendship, deleteFriendship} = require('./index/friendship')
const {getComments, postComments, putComments, deleteComments} = require('./index/comments')
const {getDiarys} = require('./index/diarys')

router.prefix(`/index`);

router.post(`${indexUrl}/`, postUserInfo)

//TODO user权限操作
//获取用户以及用户权限信息
router.get(`${indexUrl}/users`, getUser);

router.delete(`${indexUrl}/users`, deleteUser);

//添加用户用户
router.post(`${indexUrl}/users`, postUser);

//修改用户
router.put(`${indexUrl}/users`, putUser);

//添加类别

//TODO type权限操作
//获取类别
router.get(`${indexUrl}/types`, getType);

router.post(`${indexUrl}/types`, postType);

//删除类别
router.delete(`${indexUrl}/types`, deleteType);

//修改类别
router.put(`${indexUrl}/types`, putType);

//TODO image权限操作
//上传单个图片并给返回值
router.post(`${indexUrl}/image`, getImage);

//查询当前权限
router.get(`${indexUrl}/permissions`, getAllPermissions)

//TODO 轮播操作

//新增轮播
router.get(`${indexUrl}/swipt`, getSwipt);

router.post(`${indexUrl}/swipt`, postSwipt);

//修改轮播
router.put(`${indexUrl}/swipt`, putSwipt)

router.delete(`${indexUrl}/swipt`, deleteSwipt)

//TODO navbar权限操作
//删除轮播

router.get(`${indexUrl}/navbar`, getNavbar);

router.delete(`${indexUrl}/navbar`, deleteNavbar);

router.post(`${indexUrl}/navbar`, postNavbar);

//修改轮播
router.put(`${indexUrl}/navbar`, putNavbar)


//TODO 友情链接的权限操作

router.get(`${indexUrl}/friendship`, getFriendship)

router.put(`${indexUrl}/friendship`, putFriendship)

router.delete(`${indexUrl}/friendship`, deleteFriendship);

router.post(`${indexUrl}/friendship`, postFriendship);


//TODO new 的权限操作

router.get(`${indexUrl}/news`, getNew);

router.post(`${indexUrl}/news`, postNew);

router.put(`${indexUrl}/news`, putNew);

router.delete(`${indexUrl}/news`, deleteNew);

//TODO comment 的权限操作
router.get(`${indexUrl}/comments`, getComments);

router.post(`${indexUrl}/comments`, postComments);

router.put(`${indexUrl}/comments`, putComments);

router.delete(`${indexUrl}/comments`, deleteComments);

//TODO 获取日志信息

router.get(`${indexUrl}/diarys`, getDiarys)

module.exports = router
