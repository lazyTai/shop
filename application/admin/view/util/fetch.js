export function upload_image_in_artitle(opt) {
    var self = this;
    ajaxForm({
        type: 'post',
        data: opt.data,
        url: "http://localhost/huoshu/public/index/article/upload_image",
        progress(num) {
            layer.closeAll();
            layer.msg(num + '%');
        },
        success(returnJson) {
            layer.closeAll();
            opt.success && opt.success.call(self, returnJson);
        }
    })
}

function _ajax(url) {
    var self = this;
    var index = 0;
    return (opt) => {
        ajax({
            type: 'post',
            data: opt.data,
            url,
            before() {
                opt.before && opt.before.call();
            },
            success(returnJson) {
                Vue.toasted.clear();
                opt.success && opt.success.call(self, returnJson);
            }
        })
    }

}
export const fetch_logging = _ajax("/shop/public/admin/login/logging", )
