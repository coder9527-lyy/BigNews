$(function () {
    //点击显示（YYYY-MM-DD）格式
    jeDate("#ymd", {
        format: "YYYY-MM-DD",
        isinitVal: true,
        festival: false,
        isToday: true,
        minDate: jeDate.nowDate()
    })

    tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN',
        // toolbar: 'undo redo | styleselect | bold italic | link image',
        plugins: 'advlist autolink link image lists preview code', //字符串方式
        height: 300,
        branding: false,
    });
})