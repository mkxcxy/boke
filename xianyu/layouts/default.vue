<template>
  <v-app>
    <v-toolbar
      :scroll-off-screen="true"
      dark
      :clipped-left="clipped"
      scroll-target="#scrolling-techniques"
      pl-0
      app
    >
      <img class="logo" @click="$router.push('/')" src="./../assets/image/6712ba1d90ddd4456a8196476640d30d.jpg" alt="logo">
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(item,index) in navbarInfo" :key="index">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
      <v-btn
        icon
        class="hidden-md-and-up"
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container pa-0 pt-2>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer
      dark
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-group
          v-for="(item,index) in navbarInfo"
          :key="index"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(subItem,num) in item.typelist"
            :key="num"
            @click="typeSearch(subItem)"
          >
            <v-list-tile-content>
              <v-list-tile-title><span>{{ subItem.name }}</span></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!--<v-footer-->
    <!--:fixed="fixed"-->
    <!--app-->
    <!--&gt;-->
    <!--<span>&copy; 2019</span>-->
    <!--</v-footer>-->
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        bars: [
          {'class': ''},
          {'class': '', dark: true},
          {'class': 'primary', dark: true},
          {'class': 'elevation-0'}
        ],
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        navbarInfo: [
        ],
        typeList: [],
        items: [
          {
            action: 'local_activity',
            title: 'Attractions',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'restaurant',
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' }
            ]
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' }
            ]
          }
        ]
      }
    },
    methods:{
      refresh(){
        axios.get(`/api/index/api/v1/index/getNavbarInfo`).then(res=>{
          this.navbarInfo=res.data.data;
        })
      },
      typeSearch:function (value) {
        window.history.pushState({
          title: value.name
        }, '', `${window.location.origin}?title=&page=1&type=${value._id}`);
        this.$router.push(`/?title=&page=1&type=${value._id}`)
      }
    },
    created() {
      this.refresh();
    }
  }
</script>
<style lang="scss" scoped>
  .v-toolbar {
    box-shadow: none;
    border: 0px;

    .logo {
      height: 100%;
      margin-left: -15px;
    }
  }

  .theme--dark.v-toolbar {
    background: #000000;
  }

  .container__title {
    display: flex;
    left: 0px;
    top: 0px;
    background: #000;
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.2);
  }

  .v-content {
    background: #F7F9F1;
  }
</style>
