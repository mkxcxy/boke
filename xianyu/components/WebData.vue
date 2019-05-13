<template>
  <v-layout wrap row>
    <v-flex xs12>
      <v-card class="user"  :flat="true">
        <v-layout>
          <v-flex xs12>
            <br>
            <br>
            <br>
            <p class="text-xs-center">
              <img class="text-xs-center"
                   src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553354725839&di=436f3e88afc6ad12f7232c10d9f9c340&imgtype=0&src=http%3A%2F%2Fpic1.16pic.com%2F00%2F52%2F38%2F16pic_5238084_b.jpg"
                   alt="">
            </p>
            <p class="text-xs-center origin">咸鱼一条</p>
            <p class="text-xs-center gray">谁能推荐一个女朋友</p>
            <v-layout row wrap>
              <v-flex xs6>
                <p class="text-xs-right">
                  <v-btn color="warning" class="fabulous">
                    <i class="fa fa-thumbs-up"></i>
                    &nbsp;
                    555
                  </v-btn>
                </p>
              </v-flex>
              <v-flex xs6>
                <v-btn color="info" class="follow">
                  <i class="fa fa-plus"></i>&nbsp;
                  关注我
                </v-btn>
              </v-flex>
            </v-layout>
            <v-container text-xs-center pt-1 pb-4>
              <v-layout row wrap class="justify-center">
                <v-flex xs4>
                  <span class="subheading">904</span>
                  <br>
                  <span class="caption">运行天数</span>
                </v-flex>
                <v-flex xs4 class="before-line">
                  <span class="subheading">904</span>
                  <br>
                  <span class="caption">运行天数</span>
                </v-flex>
                <v-flex xs4 class="before-line">
                  <span class="subheading">904</span>
                  <br>
                  <span class="caption">运行天数</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 mt-4>
      <v-card class="pt-2"  :flat="true">
        <v-list
          subheader
          dense
          mt-2
        >
          <template v-for="(item, index) in itemsList">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>
          </template>
          <v-list-tile @click="" style="height: 5rem;">
            <v-text-field
              v-model="searchValue"
              :counter="10"
              placeholder=""
              label="请输入您想搜索的字段"
              required
              @keydown.enter="searchFun()"
            ></v-text-field>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-card class="mt-4 pt-2" :flat="true">
        <v-list
          subheader
          dense
          class="pb-3"
        >
          <template v-for="(item, index) in itemsList">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              class="mb-2"
            >
              <i class="fa fa-headphones"></i>&nbsp;最近说说
            </v-subheader>
          </template>
          <v-list-tile avatar style="height: 2.7rem;" class="mb-3"  v-for="(item,index) in diaryList" :key="index">
            <v-list-tile-content class="after-line">
              <v-list-tile-title pa-0>
                <p class="v-list__tile__title">
                  <span class="label">{{ index+1 }}</span>
                  <span> {{ item.title }} </span>
                </p>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-card class="mt-4 pt-2"  :flat="true">
        <v-list
          subheader
          dense
          class="pb-3"
        >
          <template v-for="(item, index) in itemsList">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              class="mb-2"
            >
              <i class="fa fa-comment"></i>&nbsp;最新评论
            </v-subheader>
          </template>
          <v-layout row wrap class="comments">
            <v-flex xs12 class="after-line pt-2 pb-3 pl-1" v-for="(item,index) in comentList" :key="index" v-if="index<=4" @click="$router.push(`/newInfo/${item.newId}`)">
              <v-layout>
                <v-flex lg2 class="comments--image ml-2 mr-2">
                  <img v-if="item.userData.userImage" :src="item.userData.userImage" alt="">
                </v-flex>
                <v-flex pr-2 xs9>
                  <p class="caption mb-0"><span class="mt-0" :class="{ 'text--blue':item.userData.sex,'text--pink':!item.userData.sex }">{{ item.userData.userName }}</span></p>
                  <p class="caption mb-0 mt-2 text-truncate"><input type="button" value="文章" class="type mr-1">{{ item.content }}</p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-list>
      </v-card>
      <v-card class="mt-4 pt-2" :flat="true">
        <v-list
          subheader
          dense
          class="pb-3"
        >
          <template>
            <v-subheader
              class="mb-2"
            >
              <v-layout row wrap>
                <v-flex><p class="text-xs-center mb-0 pointer" @click="showClick"><i class="fa fa-fire mr-1 "></i>&nbsp;点击排行</p></v-flex>
                <v-flex class="before-line" @click="showComment"><p class="text-xs-center mb-0 pointer"><i class="fa fa-heart mr-1"></i>&nbsp;评论排行</p></v-flex>
              </v-layout>
            </v-subheader>
            <v-layout row wrap class="rank">
              <v-flex xs12 class="pt-2 pb-3 pl-1" v-for="(item,index) in readingNumber" :key="index" @click="routerPush(item._id)">
                <v-layout row wrap>
                  <v-flex xs5 pl-1 class="rank--image">
                    <img :src="item.image" alt="封面图片">
                  </v-flex>
                  <v-flex  xs7 pl-2 pt-1 class="rank--content">
                    <p class="subheading mb-0 text-no-wrap" v-html="item.title"></p>
                    <p class="rank--content__footer mb-0 pl-2 caption gray row">
                      <span class="text--transparent">{{ item.meta.updataAt | time }}</span>
                      <span v-if="readyState" class="row--right__content"><i class="fa fa-eye"></i> {{ item.readingNumber }}</span>
                      <span v-if="!readyState" class="row--right__content"><i class="fa fa-comments "></i> {{ item.commentList | length }}</span>
                    </p>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </template>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "WebData",
    props:{
      // comentList:{
      //   type:Array,
      //   required:true
      // },
      // readingNumber:{
      //   type: Array,
      //   required: true
      // }
    },
    data() {
      return {
        readyState:true,
        searchValue:'',
        readingNumber:[],
        comentList:'',
        itemsList: [
          {header: '搜索'},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          }
        ],
        diaryList:[]
      }
    },
    methods:{
      //阅读量排行
      showComment:function () {
        axios.get(`/api/index/api/v1/index/getNewList?commentNumber=true`).then(res=>{
          this.readingNumber=res.data.data;
          this.readyState=false;
        });
      },
      //评论排行
      showClick:function () {
        axios.get(`/api/index/api/v1/index/getNewList?readingNumber=true`).then(res=>{
          this.readingNumber=res.data.data;
          this.readyState=true;
        });
      },
      //显示当前评论
      getComment:function () {
        axios.get(`/api/index/api/v1/index/getComments`).then(res=>{
          this.comentList=res.data.data;
        })
      },

      searchFun:function () {
        // this.$parent.refresh(this.searchValue);
        window.history.pushState({
          title: ''
        }, '', `${window.location.origin}?title=${this.searchValue}&page=1`)
        this.$router.push(`/?title=${this.searchValue}&page=1`)
      },
      routerPush:function (id) {
        this.$router.push(`/newInfo/${id}`);
      },
      refresh:function () {
        this.$axios.get(`/api/index/api/v1/index/getDiarys`).then(res=>{
          this.diaryList=res.data.data;
        });

        this.showComment();
        this.showClick();
        this.getComment();
      }
    },
    created() {
      this.refresh();
    }
  }
</script>

<style scoped lang="scss">
  .user {
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }
  }

  .fabulous {
    background: -webkit-linear-gradient(left, orange, #ff6700);
    height: 2.25rem;
    border-radius: 1.125rem;
  }

  .follow {
    background: -webkit-linear-gradient(left, #6dcbfc, #079eed);
    height: 2.25rem;
    border-radius: 1.125rem;
  }

  .origin {
    color: #f04343;
  }

  .gray {
    color: #888;
  }

  .spancer {
    height: 2rem;
  }

  .before-line {
    position: relative;

    ::after {
      position: absolute;
      left: 0px;
      bottom: 0px;
      content: '';
      height: 100%;
      width: 1px;
      -webkit-transform: scaleX(0.5);
      -moz-transform: scaleX(0.5);
      -ms-transform: scaleX(0.5);
      -o-transform: scaleX(0.5);
      transform: scaleX(0.5);
      background: #ccc;
    }
  }

  .after-line{
    border-bottom: 1px dashed  rgb(204, 204, 204);
    /*position: relative;*/

    /*::after {*/
      /*position: absolute;*/
      /*left: 0px;*/
      /*bottom: 0px;*/
      /*content: '';*/
      /*width: 100%;*/
      /*height: 1px;*/
      /*-webkit-transform: scaleY(0.5);*/
      /*-moz-transform: scaleY(0.5);*/
      /*-ms-transform: scaleY(0.5);*/
      /*-o-transform: scaleY(0.5);*/
      /*transform: scaleY(0.5);*/
      /*background: #ccc;*/
    /*}*/
  }

  .v-subheader {
    position: relative;
  }

  .v-subheader::after {
    content: '';
    background: #7f828b;
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    -webkit-transform: scaleY(0.1);
    -moz-transform: scaleY(0.1);
    -ms-transform: scaleY(0.1);
    -o-transform: scaleY(0.1);
    transform: scaleY(0.1);
  }

  .subheading {
    font-weight: bold;
  }

  .gray {
    color: #888
  }

  /*.caption{*/
  /*color:#888*/
  /*}*/
  /*input[type='text']{*/
  /*width: 50%;*/
  /*}*/


  .v-label {
    font-size: 8px;
  }

  .type {
    height: 1.7rem;
    font-size: 0.8rem;
    outline: none;
    border: 1px solid #f04343;
    color: #f04343;
    padding: 1px 5px;
    border-radius: 5px;
  }

  .v-list--dense .v-subheader {
    color: black;
    font-size: 14px;

    > i {
      font-size: 18px;
      font-weight: bold;
      margin-right: 0.1rem;
      color: #9e9e9e;
    }
  }

  .label{
    background-color: rgb(69, 149, 231);
    padding:3px;
    color: white;
  }

  .comments{
    .comments--image{
      display: flex;
      justify-items: center;
      align-items: center;
      justify-content: center;
      img{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
  }

  .text--blue{
    color:#4595e7
  }

  .rank{
    .rank--image{
      height: 6rem;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .rank--content{
      position: relative;
      .rank--content__footer{
        position: absolute;
        bottom: 0px;
        left: 0px;
      }
    }
  }

  .pointer{
    cursor: pointer;
  }
  .row--right__content{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .row{
    position: relative;
    width: 98%;
  }
  </style>
