(function (window) {
    let baseUrl = 'http://localhost:8080/api/v1'
    let bignews = {
        user_login: baseUrl + '/admin/user/login',
        user_info: baseUrl + '/admin/user/info',
        user_detail: baseUrl + '/admin/user/detail',
        user_edit: baseUrl + '/admin/user/edit',
        category_list: baseUrl + '/admin/category/list',
        category_add: baseUrl + '/admin/category/add',
        category_search: baseUrl + '/admin/category/search',
        category_edit: baseUrl + '/admin/category/edit',
        category_delete: baseUrl + '/admin/category/delete',
        article_query: baseUrl + '/admin/article/query',
        article_delete: baseUrl + '/admin/article/delete',
        article_publish: baseUrl + '/admin/article/publish',
        article_search: baseUrl + '/admin/article/search',
        article_edit: baseUrl + '/admin/article/edit',
        comment_search: baseUrl + '/admin/comment/search',
        comment_pass: baseUrl + '/admin/comment/pass',
        comment_reject: baseUrl + '/admin/comment/reject',
        comment_delete: baseUrl + '/admin/comment/delete',
        data_info: baseUrl + '/admin/data/info',
        data_article: baseUrl + '/admin/data/article',
        data_category: baseUrl + '/admin/data/category',
        data_visit: baseUrl + '/admin/data/visit',
    }
    window.bignews = bignews
})(window)