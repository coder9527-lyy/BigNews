$(function () {
    //焦点图位置
    $.ajax({
        url: bignews.hotPic,
        dataType: 'json',
        success: function (data) {
            let value = data.data
            // console.log(value)
            value.forEach((item, i) => {
                $('.focus_list>li').eq(i).find('img').attr('src', item.cover)
                $('.focus_list>li').eq(i).find('p').text(item.title)
            })
        }
    })

    let newsArr = [{
            url: bignews.category,
            temp: 'categoryTemp',
            classname: '.level_two'
        },
        {
            url: bignews.rank,
            temp: 'rankTemp',
            classname: '.hotrank_list'
        },
        {
            url: bignews.latest,
            temp: 'latestTemp',
            classname: '.common_news'
        },
        {
            url: bignews.latest_comment,
            temp: 'latestCommentTemp',
            classname: '.comment_list'
        },
        {
            url: bignews.attention,
            temp: 'attentionTemp',
            classname: '.attention_list'
        }
    ]
    newsArr.forEach((item, i) => {
        $.ajax({
            url: item.url,
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    // console.log(data)
                    if ($(`#${item.temp}`).length > 0) {
                        let res = template(item.temp, data)
                        $(item.classname).html(res)
                    }
                }
            }
        })
    })

    /* //tab部分的文章类型
    $.ajax({
        url: bignews.category,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                let res = template('categoryTemp', data)
                $('.level_two').html(res)
            }
        }
    })

    //最新资讯
    $.ajax({
        url: bignews.latest,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                let res = template('latestTemp', data)
                $('.common_news').html(res)
            }
        }
    })

    //热门排行
    $.ajax({
        url: bignews.rank,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                let res = template('rankTemp', data)
                $('.hotrank_list').html(res)
            }
        }
    })

    //最新评论
    $.ajax({
        url: bignews.latest_comment,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                let res = template('latestCommentTemp', data)
                $('.comment_list').html(res)
            }
        }
    })

    //焦点关注
    $.ajax({
        url: bignews.attention,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
                let res = template('attentionTemp', data)
                $('.attention_list').html(res)
            }
        }
    })
 */
})