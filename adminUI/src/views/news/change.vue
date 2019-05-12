<template>
    <div class="app-container">
        <br class="hidden-xs-only">

        <el-form label-width="80px" label-position="center">
            <el-form-item label='文章名称'>
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label='分类'>
                <el-checkbox-group
                        v-model="form.typeList"
                >
                    <el-checkbox v-for="(item,index) in typeList" :label="item._id" :key="index">{{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <el-upload
                :file-list="fileList"
                :limit="1"
                :action="url"
                :headers="headers"
                class="upload-demo"
                :on-success="successCallback"
                list-type="picture">
            <el-button size="small" type="primary">点击上传图片</el-button>
        </el-upload>
        <br>
        <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
        <br>
        <el-upload
                :action="url"
                :headers="headers"
                class="upload-demo"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload"
                list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <br>
        <el-button type="success" @click="submit">保存</el-button>
    </div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor"; //调用编辑器

    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {getType} from "../../api/types";
    import {newHandle, getNew} from "../../api/new";

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                typeList: [],
                methods: "post",
                form: {
                    content: '',
                    image: 'http://localhost:3001/images/default.jpg',
                    typeList: [],
                    title: ''
                },
                fileList: [
                    {url: 'http://localhost:3001/images/default.jpg'}
                ],
                url: '/permissions/api/v1/permissions/image',
                headers: {
                    authorization: window.localStorage.getItem('token')
                },
                content: '',
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('.upload-demo input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            onEditorBlur: function (e) {
                e.html=this.form.content;
            },
            onEditorFocus: function (e) {
                e.html=this.form.content;
            },
            onEditorChange: function (e) {
                let that = this;
                let timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    that.form.content = e.html;
                }, 100)
            },


            //上传图成功回调

            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },

            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code == '200') {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, `<img src="${res.data.url}"/>`, res.info)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },

            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },

            submit: function () {
                if (this.methods == 'put') {
                    this.form._id=this.$route.params.id
                }
                newHandle(this.form, this.methods).then(res => {
                    this.$router.push('/news/index')
                })
            },

            getType: function () {
                getType().then(res => {
                    this.typeList = res.data;
                })
            },

            //封面上传图片返回值
            successCallback: function (res) {
                this.form.image = res.data.url;
                this.$message.success(res.message)
            },
            refresh: function (id) {
                getNew('', 1, id).then(res => {
                    this.form=res.data[0];
                    // this.form.typeList=
                    this.fileList[0].url=res.data[0].image;
                    // this.
                    let arr=[];
                    for (let i in this.form.typelist){
                        arr.push(this.form.typelist[i]._id)
                    }
                    this.form.typelist=arr
                })
            }
        },

        created() {
            this.getType();
            if (this.$route.params.id != 'null') {
                this.methods = 'put';
                this.refresh(this.$route.params.id);
            }
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

