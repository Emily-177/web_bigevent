//在调用$.post $.get $.ajax之前都会先调用下面函数,获取他们的内容,以options传递
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url= 'http://ajax.frontend.itheima.net' + options.url
})