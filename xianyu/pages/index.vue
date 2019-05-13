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
            <v-layout wrap row>
              <v-flex xs12 v-if="!search.state">
                <v-carousel
                  height="100%"
                  hide-delimiters
                  hide-controls
                  :height="300"
                  dark
                >
                  <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.imageURL"
                    lazy
                    @click="routerShow(item.url)"
                  >
                    <div class="carousel-span">
                      <p overflow-hidden>{{ item.name }}</p>
                      <span class="carousel-span__index">{{ `${i+1}/${items.length} `}}</span>
                    </div>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
              <v-flex xs12 v-if="search.state" class="searchValue pa-3  justify-center align-content-center">
                <i class="fa  fa-th"></i>
                <span>&nbsp; 当前分类：<span v-if="type.totalNumber==1">{{ type.data[0].name }}</span>
                <span v-if="type.totalNumber!=1">全部</span>
                  <span class="ml-2">数量：</span>
                  <span class="text-orange">{{ newList.totalNumber }}</span> 篇</span>
                <span class="ml-2">关键词：<span class="text-orange">"{{ $route.query.title|| '' }}"</span></span>
              </v-flex>
              <NewList :newList="newList.data||[]"></NewList>
              <Pagination :totalNumber="parseInt(newList.totalNumber)" :page="parseInt($route.query.page)"></Pagination>
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
  import axios from 'axios';


  export default {
    async asyncData(context) {
      //获取轮播信息
      let search = {};
      if (context.query.title || context.query.type) {
        search = {
          state: true,
          title: context.query.title,
          type: context.query.type
        };
      } else {
        search = {
          state: false,
          title: '',
          type: ''
        }
      }


      let [swiptList, userInfo, newList,type] = await Promise.all([
        //获取轮播列表信息
        axios.get(`/api/index/api/v1/index/swipt`),
        //获取用户信息
        axios.get(`/api/index/api/v1/index/users`),

        //获取最新文章列表
        axios.get(`/api/index/api/v1/index/news?title=${search.title || ''}&type=${search.type || ''}`),
        //当前分类信息
        axios.get(`/api/index/api/v1/index/types?type=${context.query.type||''}`),

        //获取日志
      ])

      return {
        search: search,
        items: swiptList.data.data,
        userInfo: userInfo.data.data,
        newList: newList.data,
        type:type.data,
        // diarys:diarys.data.data
        // newListReadingNumber:newListReadingNumber.data
      }

    },
    components: {
      WebData,
      NewList,
      Pagination
    },
    data() {
      return {
        newsSearchSwitch: false,
        items: [],
        userInfo: {},
        newList: [],
        search: {},
        type:{

        },
        typeId:'',
        title:'',
      }
    },
    methods: {
      //启动搜索
      refresh: function (value='', page = 1) {
        let type=this.type.totalNumber;
        if (type!=1){
          type=this.type.data[0]._id
        }else{
          type=''
        }
        axios.get(`/api/index/api/v1/index/new?title=${value}&page=${page}&type=${type}`).then(res => {
          this.newList = res.data;
          this.search = {
            state: true,
            title: value,
          };
        })
      },
      routerShow:function (id) {
        this.$router.push(`/newInfo/${id}`)
      }
    },
    watch:{
      $route(){
        this.title = this.$route.query.title
        this.typeId = this.$route.query.type
      },
      title() {
        this.refresh(this.title)
      },
      typeId(){
        this.refresh()
      }
    },
    created() {
      //获取轮播信息
      // this.getSwiptList();
      // //获取用户信息
      // this.getUserInfo();
      // axios.get(`/api/index/api/v1/index/getType?type=5cab1a0fa0be9a370064e7a8`);
    },
    computed:{

    }
  }
</script>
<style lang="scss" scoped>
  .v-carousel {
    position: relative;

    .carousel-span {
      position: absolute;
      width: 100%;
      bottom: 0px;
      left: 0px;
      color: white;
      text-indent: 0.5rem;
      height: 2rem;
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.85));

      > p:first-child {
        overflow: hidden; /*自动隐藏文字*/
        text-overflow: ellipsis; /*文字隐藏后添加省略号*/
        white-space: nowrap; /*强制不换行*/
        width: 20em; /*不允许出现半汉字截断*/
        width: 60%;
        display: inline-block;
      }

      .carousel-span__index {
        float: right;
        margin-right: 1rem;
      }
    }
  }

  .spancer {
    height: 2rem;
  }

  .text--pink {
    color: pink;
  }

  .searchValue {
    background: white;
  }


  .text-orange {
    color: #ff6700;
  }
</style>
