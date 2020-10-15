$(function () {
    // console.log(bignews.user_detail)
    //进入页面查询用户信息详情
    $.ajax({
        url: bignews.user_detail,
        success: function (data) {
            // console.log(data)
            if (data.code != 200) {
                $('.modal-body').text(`${data.msg}`)
                $('#myModal').modal()
                return
            }
            let res = data.data
            $('.user_pic').attr('src', res.userPic)
            // $('.username').val(res.username)
            // $('.nickname').val(res.nickname)
            // $('.email').val(res.email)
            // $('.password').val(res.password)
            for (let key in res) {
                $(`.${key}`).val(res[key])
            }
        }
    })

    //点击按钮提交编辑用户信息
    $('.btn-edit').on('click', function (e) {
        e = window.event || e
        e.preventDefault()
        let fd = new FormData($('#form')[0])
        let username = $('.username').val().trim()
        let nickname = $('.nickname').val().trim()
        let email = $('.email').val().trim()
        let password = $('.password').val().trim()
        //非空判断
        if (!username) {
            $('.modal-body').text(`用户名称不能为空`)
            $('#myModal').modal()
            return
        }
        if (!nickname) {
            $('.modal-body').text(`用户昵称不能为空`)
            $('#myModal').modal()
            return
        }
        if (!email) {
            $('.modal-body').text(`邮箱不能为空`)
            $('#myModal').modal()
            return
        }
        if (!password) {
            $('.modal-body').text(`密码不能为空`)
            $('#myModal').modal()
            return
        }
        $.ajax({
            url: bignews.user_edit,
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data)
                $('.modal-body').text(`${data.msg}`)
                $('#myModal').modal()
                if (data.code != 200) {
                    return false
                }
                $.ajax({
                    url: bignews.user_info,
                    success: function (data) {
                        console.log(data)
                        if (data.code == 200) {
                            const url = data.data.userPic
                            const nickname = data.data.nickname
                            window.parent.postMessage({
                                url: url,
                                nickname: nickname
                            }, '*')
                        }
                    }
                })
            }
        })
    })

    //图片预览
    //创建一个全局变量url
    let url = null
    $('#exampleInputFile').on('change', function () {
        const file1 = this.files[0]
        if (file1) {
            url = window.URL.createObjectURL(file1)
        }
        $(this).prev().attr('src', url)
    })
})