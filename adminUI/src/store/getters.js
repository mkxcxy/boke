const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userData.userName,
  userImage: state => state.user.userData.userImage,
  roles: state => state.user.roles
}
export default getters
