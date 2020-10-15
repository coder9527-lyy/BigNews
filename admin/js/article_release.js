$(function () {
    //进入页面清空信息
    $('#inputTitle').val('')
    $('#inputCover').prev().attr('src', 'https://iph.href.lu/200x200?fg=666666&bg=cccccc')
    $('#mytextarea').val('')
    //获取所有分类
    // console.log(bignews.category_list)
    $.ajax({
        url: bignews.category_list,
        success: function (data) {
            let res = template('categoryTemp', data)
            // console.log(res)
            $('.category').html(res)
        }
    })

    function publish(state = '') {
        let fd = new FormData($('#form')[0])
        let activeEditor = tinymce.activeEditor;
        let editBody = activeEditor.getBody();
        activeEditor.selection.select(editBody);
        let text = activeEditor.selection.getContent({
            'format': 'text'
        });
        fd.append('content', text)
        fd.append('state', state)
        $.ajax({
            url: bignews.article_publish,
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                $('.modal-body').text(`${data.msg}`)
                $('#myModal').modal()
                if (data.code != 200) {
                    return
                }
                $('#myModal').on('hidden.bs.modal', function (e) {
                    $('.level02>li:eq(0)>a', window.parent.document)[0].click()
                })
            }
        })
    }
    //发布
    $('.btn-release').on('click', function (e) {
        e = window.event || e
        e.preventDefault()
        if ($('#inputTitle').val().trim() == '') {
            $('.modal-body').text(`请输入文章标题`)
            $('#myModal').modal()
            return
        }
        // if ($('#inputCover').val() == '') {
        //     $('.modal-body').text(`请添加文章封面`)
        //     $('#myModal').modal()
        //     return
        // }
        if (tinyMCE.activeEditor.getContent() == '') {
            $('.modal-body').text(`请输入文章内容`)
            $('#myModal').modal()
            return
        }

        publish('已发布')
    })
    //存为草稿
    $('.btn-draft').on('click', function (e) {
        e = window.event || e
        e.preventDefault()
        if ($('#inputTitle').val().trim() == '') {
            $('.modal-body').text(`请输入文章标题`)
            $('#myModal').modal()
            return
        }
        // if ($('#inputCover').val() == '') {
        //     $('.modal-body').text(`请添加文章封面`)
        //     $('#myModal').modal()
        //     return
        // }
        if (tinyMCE.activeEditor.getContent() == '') {
            $('.modal-body').text(`请输入文章内容`)
            $('#myModal').modal()
            return
        }

        publish()
    })

    //预览图片
    $('#inputCover').on('change', function () {
        let file = this.files[0]
        let url = URL.createObjectURL(file)
        $(this).prev().attr('src', url)
    })
})