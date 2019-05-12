<template>
    <el-row justify="right">
        <el-col>
            <el-pagination
                    background
                    class="pa-2 text--right"
                    layout="prev, pager, next"
                    :page-size="10"
                    @current-change="handleCurrentChange"
                    :total="totalNumber">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "index",
        props:{
            totalNumber:Number
        },
        methods:{
            handleCurrentChange(page) {
                if (this.searchValue){
                    this.$parent.refresh(this.searchValue,this.searchValue,page)
                } else{
                    this.$parent.refresh(this.searchValue,page)
                }
            }
        }
    }
</script>

<style scoped>

</style>
