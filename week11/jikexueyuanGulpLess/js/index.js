$(function(){$("#search-btn").click(function(){$("#searchbox").css({display:"block"})}),$("#close-btn").click(function(){$("#searchbox").css({display:"none"})}),$(window).scroll(function(){$(window).scrollTop()>100?$("#top").fadeIn():$("#top").fadeOut()}),$("#top").click(function(){return $("body,html").animate({scrollTop:0},1e3),!1}),$(".erwma").hover(function(){$(".erwma>img").css({display:"block"})},function(){$(".erwma>img").css({display:"none"})})});