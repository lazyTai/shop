<template>
    <div class="picture">
        <el-upload
                class="upload-demo"
                action="/admin/galleries/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :data="{'id':id}"
                :file-list="fileList2"
                list-type="picture"
                :on-success="uploadsucess"
                :before-upload="before_load"
                :headers='{Accept: "application/json; charset=utf-8"}'
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
    var url_galleries_get_picture = '/admin/galleries/selectall';
    var url_galleries_delete_picture = '/admin/galleries/deletePicture'
    export default {
        name: 'index',
        data() {
            return {
                id: '',
                length: 3,
                fileList2: []
            }
        },
        methods: {
            init: function () {
                var me = this;
                post1(url_galleries_get_picture, {id: me.id})
                    .done(function (res) {
                        if (res=='null') {
                            debugger
                            return;
                        }
                        var a = json_parse(res);
                        _.each(a, function (item) {
                            item['name'] = item['id'];
                            item['url'] = item['path'];
                        })
                        me.fileList2 = a;
                    })
            },
            handleRemove(file, fileList) {
                var me = this;
                if (!file) {
                    return false
                }
                _.each(this.fileList2, function (item) {
                    if (item.uid == file.uid) {
                        item.good_id=me.id;
                        post1(url_galleries_delete_picture,
                            item).done(function (res) {
                            if (json_parse(res).message == true) {
                                me.fileList2 = _.filter(
                                    me.fileList2, function (item1) {
                                        return item1.uid != item.uid
                                    })
                            } else {
//                        remove fail
                                document.location.reload();

                            }
                        })
                    }
                })


            },
            handlePreview(file) {
                console.log(file);
            },
            before_load: function (file) {
                var me = this;
                if (me.fileList2.length >= me.length) {
                    me.$message('图片不能超过' + me.length + '个');
                    return false;
                }
            },
            uploadsucess: function (response, file, fileList) {
                this.fileList2.push({
                    uid: file.uid,
                    name: response[0].name,
                    url: '/Public' + response[0].path
                });
            }
        },
        mounted: function () {
            var me = this;
            me.id = this.$route.params.id;
            me.init();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
