$(function () {
    //获取所有分类
    // console.log(bignews.category_list)
    $.ajax({
        url: bignews.category_list,
        success: function (data) {
            let res = template('categoryTemp', data)
            // console.log(res)
            $('#selCategory').html(res)
        }
    })

    function getArtList(page = 1) {
        $.ajax({
            url: bignews.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: page,
                perpage: 10
            },
            success: function (data) {
                if (data.code != 200) {
                    $('#myModal .modal-body').text(`${data.msg}`)
                    $('#myModal').modal()
                    return
                }
                // console.log(data)
                let totalPage = data.data.totalPage
                let res = template('listTemp', data)
                $('tbody').html(res)
                getPagination(totalPage, page)
            }
        })
    }
    getArtList()
    //点击筛选按钮查询文章列表
    $('#btnSearch').on('click', function (e) {
        e = window.event || e
        e.preventDefault()
        let type = $('#selCategory').val()
        let state = $('#selStatus').val()
        getArtList()
    })
    //保存一个全局变量page
    let localPage = null
    //分页查询文章列表
    function getPagination(totalPage, startPage = 1) {
        // 先销毁旧的分页器，因为每次请求返回的总页数不确定
        $('#pagination').twbsPagination('destroy');
        $('#pagination').twbsPagination({
            startPage: startPage,
            //total总记录数，就是多少条数据  pages总页数
            totalPages: totalPage,
            visiblePages: 5,
            first: '首页',
            last: '末页',
            prev: '上一页',
            next: '下一页',
            onPageClick: function (e, page) {
                localPage = page
                if (startPage !== page) {
                    getArtList(page)
                }
            }
        });
    }

    //删除文章
    $('tbody').on('click', '.delete', function () {
        let id = $(this).attr('data-id')
        $.ajax({
            url: bignews.article_delete,
            type: 'post',
            data: {
                id: id
            },
            success: function (data) {
                // console.log(data)
                $('#myModal .modal-body').text(`${data.msg}`)
                $('#myModal').modal()
                if (data.code != 204) {
                    return
                }
                $('#myModal').on('hidden.bs.modal', function (e) {
                    getArtList(localPage)
                })
            }
        })
    })

    //点击编辑按钮进入文章编辑页面
    $('tbody').on('click', '.update', function () {

    })

    //点击发布文章按钮，切换左侧的状态栏至发布文章
    $('#release_btn').on('click', function () {
        $('.level02>li:eq(1)>a', window.parent.document)[0].click()
    })
})