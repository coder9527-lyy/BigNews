$(function () {
    let id = window.location.href.split('=')[1]
    //获取文章详情
    $.ajax({
        url: bignews.article,
        data: {
            id: id
        },
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.code == 200) {
                let res = data.data
                $('.article_title').text(res.title)
                $('.article_info').html(res.author + ' 发布于 ' + res.date + '&nbsp;&nbsp;&nbsp;分类: ' + res.category + '&nbsp;&nbsp;&nbsp;阅读:(' + res.read + ')&nbsp;&nbsp;&nbsp; 评论: (' + res.comments + ')')
                $('.article_con').html(`<p>${res.content}</p>`)
                $('.article_links>a:eq(0)').attr('href', './article.html?id=' + res.prev.id).text(res.prev.title)
                $('.article_links>a:eq(1)').attr('href', './article.html?id=' + res.next.id).text(res.next.title)
            }
        }
    })

    //评论列表
    $.ajax({
        url: bignews.get_comment,
        data: {
            articleId: id
        },
        dataType: 'json',
        success: function (data) {
            let res = template('commentDetailTemp', data)
            $('.comment_list_con').html(res)
        }
    })

    //发表评论
    $('.comment_sub').on('click', function (e) {
        e = window.event || e
        e.preventDefalut()
        let author = $('.comment_name').val().trim()
        let content = $('.comment_input').val().trim()
        if (author == '') {
            alert('请输入你的用户名')
        }
        if (content == '') {
            alert('请发表你的看法')
        }
        $.ajax({
            url: bignews.post_comment,
            type: 'post',
            data: {
                author: author,
                content: content,
                articleId: id
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    alert('发表成功')
                    window.location.reload()
                }
            }
        })
    })
})