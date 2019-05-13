<template>
  <v-layout
    row wrap
    mt-3
    class="align-center"
  >
    <v-pagination
      v-model="thisPage"
      :length="filters(totalNumber)"
      prev-icon="fa fa-angle-left"
      next-icon="fa fa-angle-right"

      @input="refresh(thisPage)"
    ></v-pagination>
  </v-layout>
</template>

<script>
  export default {
    name: "NewList",
    props: {
      page: {
        type: Number,
        required: true
      },
      totalNumber:{
        type: Number,
        required: true
      }
    },
    data(){
      return{
        thisPage:1
      }
    },
    watch:{
      page:function () {
        this.thisPage=this.page;
      }
    },
    methods:{
      refresh:function (value) {
        this.$parent.refresh(this.$route.query.title,value)
      },
      filters:function (value) {
        if (value instanceof Number){
          return parseInt(value/10);
        } else{
          return 1
        }
      }
    },
    created() {
      this.thisPage=this.page;
    }
  }
</script>

<style scoped>
  .v-icon{
    font-size: 0.5rem;
  }
  .align-center{
    display: flex;
    justify-content: flex-end;
  }
</style>
