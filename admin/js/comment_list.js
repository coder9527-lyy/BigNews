$(function () {
    function getCommitList(page = 1) {
        $.ajax({
            url: bignews.comment_search,
            data: {
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
                let value = data.data
                let totalPage = value.totalPage
                let res = template('listTemp', value)
                $('tbody').html(res)
                getPagination(totalPage, page)
            }
        })
    }
    getCommitList()

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
                    getCommitList(page)
                }
            }
        });
    }

    $('tbody').on('click', '.pass', function () {
        let id = $(this).attr('data-id')
        $('#toggleModal').modal()
        $('input[name=id]').val(id)
        $('input[name=type]').val(1)
        $('#toggleModal .modal-body').html('确定要通过这条评论吗？')
    })
    $('tbody').on('click', '.reject', function () {
        let id = $(this).attr('data-id')
        $('#toggleModal').modal()
        $('input[name=id]').val(id)
        $('input[name=type]').val(2)
        $('#toggleModal .modal-body').html('确定要拒绝这条评论吗？')
    })
    $('tbody').on('click', '.delete', function () {
        let id = $(this).attr('data-id')
        $('#toggleModal').modal()
        $('input[name=id]').val(id)
        $('input[name=type]').val(3)
        $('#toggleModal .modal-body').html('确定要删除这条评论吗？')
    })
    $('#modalSubmit').on('click', function () {
        let type = $('input[name=type]').val()
        let id = $('input[name=id]').val()
        let url = null
        if (type == 1) {
            url = bignews.comment_pass
        } else if (type == 2) {
            url = bignews.comment_reject
        } else if (type == 3) {
            url = bignews.comment_delete
        }
        $.ajax({
            url: url,
            type: 'post',
            data: {
                id: id
            },
            success: function (data) {
                // console.log(data)
                $('#toggleModal').modal('hide')
                $('#toggleModal').on('hidden.bs.modal', function (e) {
                    $('#myModal .modal-body').text(`${data.msg}`)
                    $('#myModal').modal()
                    if (data.code != 200) {
                        return
                    }
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        getCommitList(localPage)
                    })
                })
            }
        })
    })
})