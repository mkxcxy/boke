<template>
  <v-layout
    row wrap
  >
    <v-flex xs12 mt-4 v-for="(item,index) in newList" :key="index">
      <v-card :flat="true" @click="routerPush(item._id)" class="pointer">
        <v-layout row wrap class="news" pa-3>
          <v-flex xs4 class="news--imageContainer" :style="{ 'background':`url(${item.image})` }">
          </v-flex>
          <v-flex xs8 pl-3 pt-1 class="news--content">
            <p class="new--title title font-weight-bold mb-2">
              {{ item.title }}
            </p>
            <div class="news--content__content body-2" v-html="item.content">
            </div>
            <p class="news--content__footer mb-0 pl-3 caption gray row"><span class="text--transparent">
              <i class="fa fa-table "></i>&nbsp;   {{ item.meta.updataAt | time }}</span>
              <span class="ml-2"> <i class="fa fa-user-md "></i>&nbsp;{{  }}</span>
              <span class="row--right__content"><i class="fa fa-eye"></i> {{ item.readingNumber }}
                <span><i class="fa fa-comments ml-2"></i> {{ item.commentList | length }}</span>
            </span>
            </p>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 mt-4 v-if="!show" class="error--page">
      <span>未收录您所搜索关键词有关的文章</span>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "NewList",
    props: {
      newList: {
        type: Array,
        required: true
      }
    },
    methods:{
      routerPush:function (id) {
        this.$router.push(`/newInfo/${id}`);
      }
    },
    computed:{
      show:function () {
        if (this.newList.length!=0){
          return true
        } else{
          return false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@media screen and (max-width: 600px) {*/
  /*.v-btn__content{*/
  /*display: none;*/
  /*}*/

  /*.news{*/
  /*height: 6rem;*/
  /*padding:2px;*/
  /*}*/
  /*}*/
  .news--imageContainer {
    background: url("https://cdn.vuetifyjs.com/images/carousel/sky.jpg");
    height: 8rem;
    overflow: hidden;
    background-position-x: center !important;
    background-position-y: center !important;
    background-size: cover !important;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    -webkit-transition: all .3s;
    transition: all .3s;
    background-position-x: center !important;
    background-position-y: center !important;
    background-size: cover !important;
    background-repeat-x: no-repeat !important;
    background-repeat-y: no-repeat !important;
    background-attachment: initial;
    background-origin: initial;
    background-repeat: no-repeat !important;
    background-repeat-x: no-repeat !important;
    background-repeat-y: no-repeat !important;
    background-size: cover !important;
    background-position: center !important;
    background-position-x: center !important;
    background-position-y: center !important;
    position: relative;
  }

  .news--content {
    position: relative;

    .news--content__footer {
      position: absolute;
      bottom: 0px;
      left: 0px;
      color: #9e9e9e;
    }

    .news--content__content {
      /*width: 100px;*/
      overflow: hidden;
      text-overflow: ellipsis;
      /*display: -webkit-box;*/
      /*-webkit-line-clamp: 2;*/
      /*-webkit-box-orient: vertical;*/
      /*width: 100px;*/
      color: #9e9e9e;
      font-weight: lighter;
    }

    .rank--content {
      position: relative;

      .rank--content__footer {
        position: absolute;
        bottom: 0px;
        left: 0px;
      }
    }
  }

  .gray {
    color: #888;
  }

  .row--right__content {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .row {
    position: relative;
    width: 98%;
  }

  .pointer{
    cursor: pointer;
  }

  .error--page{
    min-height: 200px;
    background: white;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
  }

</style>
