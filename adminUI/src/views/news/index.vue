<template>
    <div class="app-container">
        <br class="hidden-xs-only">
        <el-row>
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="$router.push('/news/change/null')">
                    新增
                </el-button>
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
                    label="新闻封面"
                    width="100">
                <template slot-scope="scope">
                    <img v-if="!!scope.row.image" :src="scope.row.image" alt="用户头像">
                    <img v-else :src="scope.row.image" alt="用户头像">
                </template>
            </el-table-column>
            <el-table-column
                    label="标题"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="$router.push(`/news/change/${scope.row._id}`)">编辑
                    </el-button>
                    <!--{{scope.row._id}}-->
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
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form class="pl-1  ">
                <el-form-item label="用户名称">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-select v-model="form.sex" placeholder="请选择活动区域">
                        <el-option label="男" value=true></el-option>
                        <el-option label="女" value=false></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理权限">
                    <el-select v-model="form.permissions" placeholder="请选择活动区域">
                        <el-option :label="item.name" v-for="(item,index) in prmissionsList" :value="item._id"
                                   :key="index"></el-option>
                        <!--<el-option label="女" value=false></el-option>-->
                    </el-select>
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
    import {getNew, newHandle} from "../../api/new";
    import Pagination from "@/components/Pagination";

    export default {
        components: {
            Pagination
        },
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
                    userName: '',
                    password: '',
                    sex: '',
                    permissions: '',
                    userImage: 'http://localhost:3001/images/default.jpg'
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
                    userName: '',
                    password: '',
                    sex: '',
                    permissions: '',
                    userImage: 'http://localhost:3001/images/default.jpg'
                };
                this.dialogFormVisible = true;
            },
            //删除已上传的图片
            handleRemove: function () {

            },
            //提交表单信息
            submit: function () {
                let that = this;
                userHandle(that.form, this.method).then(res => {
                    that.dialogFormVisible = false;
                    that.$message.success(res.message);
                    that.refresh();
                })
            },
            //页面刷新触发函数
            refresh: function (name = '', page = 1) {
                this.loading = true;
                getNew(name, page).then(res => {
                    this.tableData = res.data;
                    this.loading = false;
                    this.totalNumber = res.totalNumber;
                })
            },
            imageCallback: function (res) {
                this.form.userImage = res.data.url;
            },
            //删除单个用户（非管理）
            handleDelete: function (id) {
                let that = this;
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    newHandle({_id: id}, 'delete').then(res => {
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
                this.method = 'put';
                this.title = '编辑用户';
                this.dialogFormVisible = true;
                this.form = value;
            },
            //搜索用户
            searchUser: function () {
                this.refresh(this.searchValue);
            },
            //触发分页
            handleCurrentChange(page) {
                this.refresh(this.searchValue, page)
            }
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

