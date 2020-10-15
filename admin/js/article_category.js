$(function () {
    // console.log(bignews.category_list)
    //先渲染列表
    $('.category_table>tbody').html('搜索中……')

    function getCategoryList() {
        $.ajax({
            url: bignews.category_list,
            success: function (data) {
                if (data.code != 200) {
                    $('#myModal .modal-body').text(`${data.msg}`)
                    $('#myModal').modal()
                    return
                }
                let res = template('myTemp', data)
                $('.category_table>tbody').html(res)
            }
        })
    }
    getCategoryList()
    //添加新的文章类别
    $('#xinzengfenlei').on('click', function () {
        $('#changeModal').modal()
        $('#exampleModalLabel').text('新增分类')
        $('#modalSubmit').attr('class', 'btn btn-success')
        //先清空input框
        $('#recipient-name').val('')
        $('#message-text').val('')
        $('#categoryType').val(0)
    })
    //编辑文章类别
    $('.category_table>tbody').on('click', '.btn-update', function () {
        $('#changeModal').modal()
        $('#exampleModalLabel').text('编辑分类')
        $('#modalSubmit').attr('class', 'btn btn-info')
        let id = $(this).attr('data-id')
        $('#categoryId').val(id)
        $('#categoryType').val(1)
        //请求数据
        $.ajax({
            url: bignews.category_search,
            data: {
                id: id
            },
            success: function (data) {
                console.log(data)
                $('#recipient-name').val(data.data[0].name)
                $('#message-text').val(data.data[0].slug)
            }
        })
    })

    //删除文章类别
    $('.category_table>tbody').on('click', '.btn-delete', function () {
        $('#changeModal').modal()
        $('#exampleModalLabel').text('删除分类')
        let id = $(this).attr('data-id')
        $('#categoryId').val(id)
        $('#categoryType').val(2)
        $('#changeModal form').hide()
        $('#changeModal .modal-body').append(`<p class="categoryP">确定要删除id为${id}的类别吗？<p>`)
    })

    $('#modalSubmit').on('click', function () {
        //设置进入的类型：0:add,1:edit,2:delete
        let type = $('#categoryType').val()
        let name = $('#recipient-name').val().trim()
        let slug = $('#message-text').val().trim()
        let id = $('#categoryId').val().trim()
        if (!name && type != 2) {
            $('#myModal .modal-body').text(`请输入分类名称`)
            $('#myModal').modal()
            return
        }
        if (!slug && type != 2) {
            $('.modal-body').text(`请输入分类说明`)
            $('#myModal').modal()
            return
        }
        let url = ''
        let data = {}
        if (type == 0) {
            url = bignews.category_add
            data = {
                name: name,
                slug: slug
            }
        } else if (type == 1) {
            url = bignews.category_edit
            data = {
                name: name,
                slug: slug,
                id: id
            }
        } else if (type == 2) {
            url = bignews.category_delete
            data = {
                id: id
            }
        }
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (data) {
                // console.log(data)
                $('#changeModal').modal('hide')
                $('#changeModal').on('hidden.bs.modal', function (e) {
                    if (type == 0) {
                        if (data.code != 201) {
                            $('#myModal .modal-body').text(`${data.msg}`)
                            $('#myModal').modal()
                            return
                        }
                    } else if (type == 1) {
                        if (data.code != 200) {
                            $('#myModal .modal-body').text(`${data.msg}`)
                            $('#myModal').modal()
                            return
                        }
                    } else if (type == 2) {
                        $('.categoryP').remove()
                        if (data.code != 204) {
                            $('#myModal .modal-body').text(`${data.msg}`)
                            $('#myModal').modal()
                            return
                        }
                    }

                    $('#myModal .modal-body').text(`${data.msg}`)
                    $('#myModal').modal()
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        getCategoryList()
                    })
                })

            }
        })
    })
})