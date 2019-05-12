<template>
    <div class="app-container">
        <br class="hidden-xs-only">
        <el-row>
            <el-col :span="12">
                <!--<el-button type="primary" icon="el-icon-plus" size="small" @click="add()">新增</el-button>-->
                <br>
            </el-col>
            <!--<el-col :span="12" class="text&#45;&#45;right">-->
                <!--<el-input-->
                        <!--v-model="searchValue"-->
                        <!--placeholder="请输入内容"-->
                        <!--suffix-icon="el-icon-search"-->
                        <!--@keydown.native.enter="searchUser()"-->
                <!--&gt;-->
                <!--</el-input>-->
            <!--</el-col>-->
        </el-row>
        <el-table
                :v-loading="loading"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    width="150"
                    label="提交用户名"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.userData.userName }}</span><span class="pl-1"
                                                                                                  :class="{ 'text--blue':scope.row.userData.sex,'text--pink':!scope.row.userData.sex }">{{ scope.row.userData.sex?'♂':'♀' }}</span>

                </template>
            </el-table-column>
            <el-table-column
                    label="用户头像"
                    width="100"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.userData.userImage" alt="用户头像">
                </template>
            </el-table-column>
            <el-table-column
                    label="评论内容"
                    prop="content"
            >
            </el-table-column>
            <el-table-column label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleLook(scope.row)">查看子评论
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :totalNumber="parseInt(totalNumber)"></Pagination>

        <el-dialog title="子评论列表" :visible.sync="dialogTableVisible">
            <el-table :data="dialogTableList">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="提交用户名"
                >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.userData.userName }}</span><span class="pl-1"
                                                                                                      :class="{ 'text--blue':scope.row.userData.sex,'text--pink':!scope.row.userData.sex }">{{ scope.row.userData.sex?'♂':'♀' }}</span>

                    </template>
                </el-table-column>
                <el-table-column
                        label="评论内容"
                        prop="content"
                >
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import {getComments, commmentsHandle} from "../../api/comments";
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
                totalNumber:'',
                dialogTableVisible:false,
                dialogTableList:[]
            }
        },
        methods: {
            //页面刷新触发函数
            refresh: function (page=1,id='') {
                this.loading = true;
                getComments(page,id).then(res => {
                    // debugger
                    this.tableData = res.data;
                    this.loading = false;
                    this.totalNumber=res.totalNumber;
                })
            },
            handleLook:function (val) {
                // console.log(val.replyList)
                this.dialogTableList=val.replyList;
                this.dialogTableVisible=true;
            },
            handleDelete:function (val) {
                commmentsHandle(val,'delete').then(res=>{

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

