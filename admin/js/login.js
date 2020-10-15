$(function () {
    $('.input_sub').on('click', function (e) {
        e = window.event || e
        e.preventDefault()
        let username = $('.input_txt').val().trim()
        let password = $('.input_pass').val().trim()
        if (!username || !password) {
            $('.modal-body').text(`邮箱密码不能为空，请重新输入`)
            $('#myModal').modal()
            return
        }
        $.ajax({
            url: bignews.user_login,
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                console.log(data)
                if (data.code != 200) {
                    $('.modal-body').text(`${data.msg},请重新输入`)
                    $('#myModal').modal()
                    return
                }
                window.localStorage.setItem('token', data.token)
                $('.modal-body').text(`${data.msg}`)
                $('#myModal').modal()
                $('#myModal').on('hidden.bs.modal', function (e) {
                    window.location.href = './index.html'
                })
            }
        })
    })
})