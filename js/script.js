(function ($) {
  var app = $('.app-body')
  var header = $('.header')
  var banner = document.getElementById('article-banner') || false
  var about = document.getElementById('about-banner') || false
  var top = $('.scroll-top')
  var bottom = $('.scroll-bottom')
  var catalog = $('.catalog-container .toc-main')
  var isOpen = false
  var bheight = $(document).height();

  $(document).ready(function () {
    NProgress.start()
    $('#nprogress .bar').css({
      'background': '#42b983'
    })
    $('#nprogress .spinner').hide()

    var fade = {
      transform: 'translateY(0)',
      opacity: 1
    }
    if (banner) {
      app.css('transition-delay', '0.15s')
      $('#article-banner').children().css(fade)
    }
    if (about) {
      $('.author').children().css(fade)
    }
    app.css(fade)
  })

  window.onload = function () {
    setTimeout(function () {
      NProgress.done()
    }, 200)
  }

  $('.menu').on('click', function () {
    if (!header.hasClass('fixed-header') || isOpen) {
      header.toggleClass('fixed-header')
      isOpen = !isOpen
    }
    $('.menu-mask').toggleClass('open')
  })

  $('#tag-cloud a').on('click', function () {
    var list = $('.tag-list')
    var name = $(this).data('name')
    var maoH = list.find('#' + name).offset().top

    $('html,body').animate({
      scrollTop: maoH - header.height()
    }, 500)
  })

  $('.reward-btn').on('click', function () {
    $('.money-code').fadeToggle()
  })

  $('.arrow-down').on('click', function () {
    $('html, body').animate({
      scrollTop: banner.offsetHeight - header.height()
    }, 500)
  })

  $('.toc-nav a').on('click', function (e) {
    e.preventDefault()
    var catalogTarget = e.currentTarget
    var scrollTarget = $(catalogTarget.getAttribute('href'))
    var top = scrollTarget.offset().top
    if (top > 0) {
      $('html,body').animate({
        scrollTop: top - 65
      }, 500)
    }
  })

  top.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600)
  })

  bottom.on('click', function () {
    $('html, body').animate({ scrollTop: $(document).height() }, 600)
  })

  document.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var headerH = header.height()
    if (banner) {
      if (scrollTop > headerH) {
        header.addClass('fixed-header')
      } else if (scrollTop === 0) {
        header.removeClass('fixed-header')
      }
    }
    if (scrollTop > 100) {
      top.addClass('opacity')
    } else {
      top.removeClass('opacity')
    }
    if (scrollTop > 190) {
      catalog.addClass('fixed-toc')
    } else {
      catalog.removeClass('fixed-toc')
    }

    // 到页底
    if(scrollTop<($(document).height()-$(window).height()-100)){
      bottom.addClass('opacity')
    }else{
      bottom.removeClass('opacity')
    }
  })

  // 图片懒加载
  $(".lazyload").lazyload({
  threshold : 200,
  effect:"fadeIn"
  });

})(jQuery)

// 只同时播放一个音频
var audios = document.getElementsByTagName('audio');
for (var i = audios.length - 1; i >= 0; i--) {
    (function(){
        var p = i;
        audios[p].addEventListener('play',function(){
            pauseAll(p);
        })
    })()
}
function pauseAll(index){
    for (var j = audios.length - 1; j >= 0; j--) {
        if (j!=index) audios[j].pause();
    }
};

// essay页去掉多余的p和br
$(function(){
  $('.markdown-content p>img').unwrap();
  $("p:empty").remove();
  $('br').remove();
});

// 表格单词点击播放发音
// $(function(){
//   $(".word-content tr").children('td:even').wrapInner("<a class='pro'></a>");
//   $myaudio = $('<audio autoplay="" id="audio" class="audio " type="audio/ogg;codecs=opus" src="">Your browser does not support the audio element.</audio>')
//   $('.word-content').append($myaudio);

//   $front = "https://text-to-speech-demo.ng.bluemix.net/api/v1/synthesize?text=";
//   $end = "&voice=en-US_AllisonV3Voice&download=true&accept=audio%2Fmp3";

//   $(".pro").click(function(){
//     $mytext = $(this).text();
//     $link = $front + $mytext + $end;
//     $myaudio.attr('src',$link);
//   });
// });


$(function(){

  $(".word-content tr").children('td:even').wrapInner("<a class='pro'></a>");
  $myaudio = $('<audio autoplay="" id="audio" class="audio " type="audio/ogg;codecs=opus" src="">Your browser does not support the audio element.</audio>')
  $('.word-content').append($myaudio);

  $front = "https://text-to-speech-demo.ng.bluemix.net/api/v1/synthesize?text=";
  $end = "&voice=en-US_AllisonV3Voice&download=true&accept=audio%2Fmp3";

  $(".pro").click(function(){
    $mytext = $(this).text();
    $link = $front + $mytext + $end;
    $myaudio.attr('src',$link);
    var sound = new Howl({
      src: $link
    });

    sound.play();
  });
});