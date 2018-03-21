export function fetch_upload_image_in_good(opt) {
    var self = this;
    ajaxForm({
        type: 'post',
        data: opt.data,
        url: "/shop/public/index/good/upload_image",
        progress(num) {
            // layer.msg(num + '%');
        },
        success(returnJson) {
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
                opt.success && opt.success.call(self, returnJson);
            }
        })
    }

}
export const fetch_good_add = _ajax("/shop/public/index/good/add", )