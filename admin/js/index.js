$(function () {
    //进入页面，先获取用户信息
    $.ajax({
        url: bignews.user_info,
        success: function (data) {
            // console.log(data)
            if (data.code != 200) {
                $('.modal-body').text(`${data.msg}`)
                $('#myModal').modal()
                return
            }
            $('.user_info>img').attr('src', data.data.userPic)
            $('.user_info>span>i').text(data.data.nickname)
            $('.user_center_link>img').attr('src', data.data.userPic)
        }
    })
    //退出页面
    $('.logout').on('click', function () {
        sessionStorage.removeItem('token')
        window.location.href = './login.html'
    })

    //iframe自适应宽高
    function resizeFrame() {
        let frame_w = $('#main_body').outerWidth()
        let frame_h = $('#main_body').outerHeight()
        // console.log(frame_h, frame_w)
        $('#main_frame').css({
            'width': frame_w,
            'height': frame_h
        })
    }
    resizeFrame()
    $(window).on('resize', function () {
        resizeFrame()
    })

    //左侧导航栏切换
    let $level01 = $('.level01')
    let $level02 = $('.level02')
    let $level02_li = $('.level02 li')
    // $('.level01>a,.level02>li>a').on('click', function (e) {
    //     e = window.event || e
    //     e.preventDefault()
    // })
    $level01.on('click', function () {
        // console.log($(this).index())
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).next().hasClass('level02')) {
            $(this).next().slideToggle()
            $(this).find('b').toggleClass('rotate0')
            $(this).next().find('li:eq(0) a')[0].click()
        } else {
            $level02_li.removeClass('active')
            $level02.slideUp()
        }
    })
    $level02_li.on('click', function () {
        // console.log($(this).index())
        $(this).addClass('active').siblings().removeClass('active')
    })

    //监听从子页面传值过来
    window.addEventListener('message', function (e) {
        $('.user_info>img,.user_center_link>img').attr('src', e.data.url)
        $('.user_info i').text(e.data.nickname)
    })

    //点击顶部栏进入个人中心
    $('#userCenter').on('click', function () {
        $('#user').find('a').click()
    })
})