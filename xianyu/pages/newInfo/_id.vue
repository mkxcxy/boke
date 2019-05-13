<template>
  <v-container
    mt-0
    pa-0
  >
    <v-layout
      column
    >
      <v-flex
        xs12
      >
        <v-layout wrap row>
          <v-flex xs12 class="spancer hidden-sm-and-down"></v-flex>
          <v-flex xs12 sm7 md8>
            <v-layout wrap row align-content-center>
              <v-flex class="white xs12 text--center newInfo pa-3" v-if="newInfo instanceof Object">
                <p class="headline mt-2 font-weight-medium newInfo--header">
                  {{ newInfo.title }}
                </p>
                <p class="caption  font-weight-light mt-4 text--gray newInfo--info">
                  <i class="fa fa-clock-o mr-1"></i>{{ newInfo.meta.updataAt | time }}
                  <i class="fa fa-user ml-2 mr-1"></i>咸鱼
                  <i class="fa fa-comments mr-1 ml-2"></i> {{ newInfo.commentList | length }}
                  <i class="fa fa-eye mr-1"></i> {{ newInfo.readingNumber }}
                </p>
                <div class="line mt-4"></div>
                <v-flex class="newInfo--introduce xs12 mt-4">
                  <span>“{{ newInfo.content }}”</span>
                </v-flex>
                <v-flex class="newInfo--content mt-3" v-html="newInfo.content">

                </v-flex>
                <v-flex class="newInfo--footer pa-3 pb-4">
                  <div class="line mt-0"></div>
                  <div class="pt-3">
                    <v-chip outline :color="item.color" :text-color="item.color"
                            v-for="(item,index) in newInfo.typeList" :key="index" @click="routerPush(item._id)">{{
                      item.name }}
                    </v-chip>
                  </div>
                </v-flex>
              </v-flex>
              <v-flex class="comment mt-4">
                <v-flex xs12 class="comment--title justify-center align-content-center   pa-3">
                  <span>共有 <span class="text-orange">{{ newInfo.commentList | length  }}</span> 条评论</span>
                  <span class="text--right"><i class="fa fa-edit"></i><a href="#form"> 发表评论</a></span>
                </v-flex>
                <v-flex xs12 class="comment--content mt-4 pa-4" v-if="newInfo.commentList.length!=0" v-for="(item,index) in newInfo.commentList" :key="index" >
                  <v-layout row wrap>
                    <v-flex xs2 lg1 class="comment--content__userImage">
                      <img :src="item.userData.userImage" alt="用户头像">
                    </v-flex>
                    <v-flex xs10 lg11>
                      <v-card :flat="true" class="text--gray caption">
                        <span><i class="fa fa-user mr-1 mb-1"></i><span  :class="{ 'text--blue':item.userData.sex,'text--pink':!item.userData.sex }">{{ item.userData.userName }}</span></span>
                        <span  class="hidden-sm-and-down"><i class="fa fa-clock-o mr-1 ml-2"></i>{{ item.userData.updataAt | time }}</span>
                      </v-card>
                      <v-card :flat="true">{{ item.content }}</v-card>
                      <v-flex class="mt-2" v-if="item.commentList.length!=0" v-for="(reply,num) in item.commentList" :key="num">
                        <div class="line mb-3"></div>
                        <v-layout row wrap>
                          <v-flex class="comment--content__userImage xs2 lg1">
                            <img :src="reply.userData.userImage" alt="用户头像">
                          </v-flex>
                          <v-flex class="xs10 lg11">
                            <v-card :flat="true" class="caption text--gray">
                              <span><i class="fa fa-user mr-1 mb-1"></i><span  :class="{ 'text--blue':reply.userData.sex,'text--pink':!reply.userData.sex }">{{ reply.userData.userName }}</span></span>
                              <span class="hidden-sm-and-down"><i class="fa fa-clock-o mr-1 ml-2"></i>{{ reply.userData.updataAt | time }}</span>
                              <span class="text-orange ml-2">回复：<span>{{ reply.replyName }}</span></span>
                            </v-card>
                            <v-card :flat="true">{{ reply.content }}</v-card>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="comment--form   mt-4 pa-4" id="form">
                  <form>
                    <v-text-field
                      v-model="name"
                      v-validate="'required|max:10'"
                      :counter="10"
                      :error-messages="errors.collect('name')"
                      prepend-inner-icon="fa fa-user"
                      label="您的称呼（必填）"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('email')"
                      prepend-inner-icon="fa fa-internet-explorer"
                      label="您的E-mail（必填）"
                      data-vv-name="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="content"
                      v-validate="'required|max:100'"
                      :error-messages="errors.collect('content')"
                      prepend-inner-icon="fa fa-weixin"
                      label="您的评价（必填）"
                      data-vv-name="content"
                      required
                    ></v-text-field>
                    <v-btn @click="submit" color="warning">提交</v-btn>
                    <v-btn @click="clear">重置</v-btn>
                  </form>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex pl-4 xs12 sm5 md4 class="hidden-xs-only">
            <WebData></WebData>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import WebData from '~/components/WebData.vue'
  import Pagination from '~/components/Pagination.vue'
  import NewList from '~/components/NewList.vue'
  import axios from 'axios';;


  //验证插件
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'

  Vue.use(VeeValidate)

  export default {
    async asyncData(context) {
      let url = '';
      if (!context.params.id) {
        url = `/api/index/api/v1/index/getNewInfo`
      } else {
        url = `/api/index/api/v1/index/getNewInfo?id=${context.params.id}`
      }

      let [newInfo, userInfo,getSwiptList] = await Promise.all([
        //获取轮播列表信息
        axios.get(url),

        axios.get(`/api/index/api/v1/index/getUserInfo`),
        // getSwiptList()
      ])

      return {
        newInfo: newInfo.data.data,
        userInfo: userInfo.data.data,

      }
    },
    components: {
      WebData,
      NewList,
      Pagination
    },
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        newInfo:{

        },
        name: '',
        email: '',
        content: '',
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        checkbox: null,
        dictionary: {
          attributes: {
            email: 'E-mail Address'
            // custom attributes
          },
          custom: {
            name: {
              required: () => '称呼不能为空哦，请输入',
              max: '称呼请不超过十个字节'
              // custom messages
            },
            email: {
              required: () => '联系邮箱不能为空哦，请输入',
              email: () => '请输入正确的邮箱格式'
            },
            content:{
              required: () => '您的评价不能为空哦，请输入',
              max: '评价不能超过1一百个字符'
            },
          }
        }
      }
    },
    methods: {
      routerPush: function (id) {
        window.history.pushState({
          title: ''
        }, '', `${window.location.origin}?title=&page=1&type=${id}`)
        this.$router.push(`/?title=&page=1&type=${id}`)
      },
      submit() {
        this.$validator.validateAll().then(result=>{
          if (result){
            this.$axios.post('/api/index/api/v1/index/getComments',{
              newId:this.$route.params.id,
              content:this.content,
              userName:this.name,
              email:this.email
            }).then(res=>{
              this.refresh();
            })
          }
        })
      },
      clear() {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      },
      refresh:function () {
        this.$axios.get(`/api/index/api/v1/index/getNewInfo?id=${this.$route.params.id}`).then(res=>{
          this.newInfo=res.data.data;
        })
      }
    },
    watch: {},
    mounted() {
      this.$validator.localize('en', this.dictionary)
    },
    computed: {}
  }
</script>
<style lang="scss" scoped>
  .text--pink {
    color: pink;
  }NewList

  .searchValue {
    background: white;
  }


  .text-orange {
    color: #ff6700;
  }

  .text--center {
    text-align: center;
  }

  .spancer {
    height: 2rem
  }

  .newInfo {
    min-height: 500px;
    position: relative;

    .newInfo--introduce {
      background: #fbfafa;
      min-height: 5rem;
      display: flex;
      justify-items: center;
      justify-content: center;
      align-items: center;
      align-content: center;

      > span {
        color: gray;
        position: relative;
      }
    }

    .newInfo--content {
      display: block;
      text-align: left;
    }

    .newInfo--footer {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      width: 100%;
    }
  }

  .text--gray {
    color: gray;
  }

  .line {
    height: 1px;
    background: gray;
    width: 100%;
    -webkit-transform: scaleY(0.1);
    -moz-transform: scaleY(0.1);
    -ms-transform: scaleY(0.1);
    -o-transform: scaleY(0.1);
    transform: scaleY(0.1);
    border-radius: 50%;
  }

  .comment {
    /*background: ;*/
    background: #F7F8EF;

    .comment--title {
      background: white;
      min-height: 2rem;
      line-height: 2rem;
      text-align: left;
    }

    .comment--form {
      background: white;
    }

    .comment--content {
      background: white;
      .comment--content__userImage{
        text-align: center;
      }
      img{
        width: 50%;
        border-radius: 50%;
      }
    }
  }

  .text--right {
    float: right;

    > a {
      color: black;
      text-decoration: none;
    }
  }

  .text--blue{
    color: cornflowerblue;
  }

  .text--pink{
    color: hotpink;
  }
</style>
