(function (window) {
    let baseUrl = 'http://localhost:8080/api/v1'
    let bignews = {
        hotPic: baseUrl + '/index/hotpic',
        category: baseUrl + '/index/category',
        latest: baseUrl + '/index/latest',
        rank: baseUrl + '/index/rank',
        latest_comment: baseUrl + '/index/latest_comment',
        attention: baseUrl + '/index/attention',
        article: baseUrl + '/index/article',
        get_comment: baseUrl + '/index/get_comment',
        post_comment: baseUrl + '/index/post_comment',
        search: baseUrl + '/index/search'
    }
    window.bignews = bignews
})(window)