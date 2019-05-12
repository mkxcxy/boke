<template>
    <div class="app-container">
        <br class="hidden-xs-only">
        <el-row>
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="add()">新增</el-button>
            </el-col>
            <el-col :span="12" class="text--right">
                <el-input
                        v-model="searchValue"
                        placeholder="请输入内容"
                        suffix-icon="el-icon-search"
                        @keydown.native.enter="searchUser()"
                >
                </el-input>
            </el-col>
        </el-row>
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
                    label="类别名"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="颜色"
                    width="180">
                <template slot-scope="scope">
                 <span :style="{ color:scope.row.color }">{{ scope.row.color }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :totalNumber="totalNumber" :searcValue="searchValue"></Pagination>
        <!--弹出框-->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form class="pl-1  ">
                <el-form-item label='类别名称'>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label='类别颜色'>
                    <el-color-picker v-model="form.color"></el-color-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getType,typeHandle} from "@/api/types";
    import Pagination from "@/components/Pagination";

    export default {
        name: "index",
        components:{
            Pagination
        },
        data() {
            return {
                loading: false,
                tableData: [],
                totalNumber: 1,
                searchValue: '',
                form: {
                    name: "",
                    color: ''
                },
                dialogFormVisible: false,
                title: ""
            }
        },
        methods: {
            refresh: function (name = '', page = 1) {
                getType(name, page).then(res => {
                    this.tableData = res.data;
                    this.totalNumber = res.totalNumber;
                })
            },
            add: function () {
                this.title = '新增类别';
                this.form={
                    name: "",
                    color: ''
                };
                this.method='post';
                this.dialogFormVisible = true;
            },
            //删除已上传的图片
            handleRemove: function () {

            },
            //提交表单信息
            submit: function () {
                let that = this;
                typeHandle(that.form,that.method).then(res => {
                    that.dialogFormVisible = false;
                    that.$message.success(res.message);
                    that.refresh();
                })
            },
            //删除单个用户（非管理）
            handleDelete: function (id) {
                let that = this;
                this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    typeHandle({_id: id},'delete').then(res => {
                        that.$message.success(res.message);
                        that.refresh();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '已取消删除',
                        showClose: true,
                    });
                });
            },
            //编辑单个用户
            handleEdit: function (value) {
                this.title = '编辑类别';
                this.form=value;
                this.method='put';
                this.dialogFormVisible = true;
            },
            //搜索用户
            searchUser: function () {
                this.refresh(this.searchValue);
            }
        },
        created() {
            this.refresh();
        }
    }
</script>

<style scoped>

</style>
