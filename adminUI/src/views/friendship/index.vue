<template>
    <div class="app-container">
        <br class="hidden-xs-only">
        <el-table
                :v-loading="loading"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="提交用户"
                    prop="name"
            >
            </el-table-column>
            <el-table-column
                    label="链接"
                    prop="link"
                    >
            </el-table-column>
            <el-table-column label="是否显示在主页"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.show"
                            active-text="显示"
                            @change="showChange(scope.row)"
                            inactive-text="隐藏">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :totalNumber="parseInt(totalNumber)"></Pagination>
    </div>
</template>

<script>
    import {getFriendship, friendshipHandle} from "../../api/friendship";
    import Pagination from "@/components/Pagination";

    export default {
        components:{
            Pagination
        },
        data() {
            return {
                //是否在加载中
                loading: false,
                //表单列表数据
                tableData: [],
                //是否显示弹出框
                searchValue: '',
                form: {
                    name: '',
                    link: '',
                    typelist: [],
                    index: ''
                },
                prmissionsList: [],
                headers: {
                    authorization: window.localStorage.getItem('token')
                },
                title: '',
                method: '',
                typeList: [],
                totalNumber:''
            }
        },
        methods: {
            //页面刷新触发函数
            refresh: function () {
                this.loading = true;
                getFriendship().then(res => {
                    // debugger
                    this.tableData = res.data;
                    this.loading = false;
                    this.totalNumber=res.totalNumber;
                })
            },
            // //编辑单个用户
            // handleEdit: function (value) {
            //     this.method = 'put';
            //     this.title = '编辑用户';
            //     this.dialogFormVisible = true;
            //     this.form = value;
            // },
            showChange:function (value) {
                friendshipHandle(value,'put').then(res=>{
                    this.refresh()
                })
            }
        },
        created() {
            this.refresh();
        },
    }
</script>

<style scoped lang="scss">
    .line {
        text-align: center;
    }

    .el-input {
        max-width: 300px;
    }

    .el-table__row {
        img {
            width: 100%;
        }
    }
</style>

