<template>
    <div class="app-container">
        <br class="hidden-xs-only">
        <el-row>
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="add()">新增</el-button>
            </el-col>
        </el-row>
        <br>
        <el-alert
                title="序号越靠前轮播越靠前哦"
                type="success">
        </el-alert>
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
                    label="略缩图"
                    width="100">
                <template slot-scope="scope">
                    <img v-if="!!scope.row.imageURL" :src="scope.row.imageURL" alt="轮播图">
                    <img v-else :src="scope.row.imageURL" alt="轮播图">
                </template>
            </el-table-column>
            <el-table-column
                    label="简介"
                    prop="name"
            >
            </el-table-column>
            <el-table-column
                    label="轮播序号"
                    prop="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="轮播链接"
                    prop="url"
                    width="100">
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
        <!--弹出框-->
        <el-dialog title="新增轮播" :visible.sync="dialogFormVisible">
            <el-form class="pl-1  ">
                <el-form-item label='轮播简介'>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label='轮播地址'>
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label='轮播序号'>
                    <el-input v-model="form.index"></el-input>
                </el-form-item>
                <el-upload
                        class="upload-demo"
                        :limit="1"
                        :action="url"
                        :headers="headers"
                        :file-list="fileList"
                        :on-success="imageCallback"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getSwiptList, swiptHandle} from "../../api/swipt";

    export default {
        data() {
            return {
                //是否在加载中
                loading: false,
                //表单列表数据
                tableData: [],
                //是否显示弹出框
                dialogFormVisible: false,
                searchValue: '',
                form: {
                    name: '',
                    index: '',
                    url: '',
                    imageURL: 'http://localhost:3001/images/default.jpg'
                },
                prmissionsList: [],
                fileList: [
                    {url: 'http://localhost:3001/images/default.jpg'}
                ],
                url: '/permissions/api/v1/permissions/image',
                headers: {
                    authorization: window.localStorage.getItem('token')
                },
                totalNumber: 1,
                title: '',
                method: ''
            }
        },
        methods: {
            //新增用户
            add: function () {
                this.method = 'post';
                this.title = '新增用户';
                this.form = {
                    name: '',
                    index: '',
                    url: '',
                    imageURL: 'http://localhost:3001/images/default.jpg'
                };
                this.dialogFormVisible = true;
            },
            //提交表单信息
            submit: function () {
                let that = this;
                swiptHandle(that.form, this.method).then(res => {
                    that.dialogFormVisible = false;
                    that.$message.success(res.message);
                    that.refresh();
                })
            },
            //页面刷新触发函数
            refresh: function () {
                let that = this;
                this.loading = true;
                getSwiptList().then(res => {
                    // debugger
                    this.tableData = res.data;
                    this.loading = false;
                    this.totalNumber = res.totalNumber;
                })
            },
            imageCallback: function (res) {
                this.form.imageURL = res.data.url;
            },
            //删除单个用户（非管理）
            handleDelete: function (id) {
                let that = this;
                this.$confirm('此操作将永久删除该轮播, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    swiptHandle({_id: id}, 'delete').then(res => {
                        that.$message.success(res.message);
                        that.refresh();
                    });
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
                this.method='put';
                this.title='编辑用户';
                this.dialogFormVisible=true;
                this.form=value;
            },
        },
        created() {
            this.refresh();
        }
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

