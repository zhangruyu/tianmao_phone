$(function () {
    //头部
    var header1=document.querySelector("header");
    var header=document.querySelector(".header");
    var con=header1.querySelector("header .con");
    var left=header1.querySelector(".left");
    var right=header1.querySelector(".right");
    var top1=header1.offsetHeight;
    var TOP=document.querySelector("#TIME").offsetTop;
    $(window).scroll(function(){
        var top = $(this).scrollTop();
        if(top>0){
            $(header).css({
                position:"fixed",
                top:"-0.32rem",
            })
            $(con).css({
                transform:"scaleX(0.85) translateY(-0.03rem)",
            })
            $(left).css({
                transform: "scaleX(1.2) translateY(0.4rem)"
            })
            $(right).css({
                transform: "scaleX(1) translateY(0.4rem)"
            })
        }
        else {
            $(header).css({
                position:"relative",
                top:0
            })
            $(con).css({
                transform:"scaleX(1) translateY(0)",
            })
            $(left).css({
                transform: "scaleX(1) translateY(0)"
            })
            $(right).css({
                transform: "scaleX(1) translateY(0)"
            })
        }
        if(top>TOP){
            $(".Timg").css({
                opacity: 1
            })
        }
        else {
            $(".Timg").css({
                opacity: 0
            })
        }
    })

    // 轮播图
    var imgs=document.querySelectorAll(".imgs .imgbox");
    var btns=document.querySelectorAll(".imgs .btns .btn");
    var now=0;
    var next=0;
    var t=setInterval(move,2000);
    function move() {
        next=now+1;
        if(next==imgs.length){
            next=0;
        }
        $(btns).removeClass("active");
        $(btns[next]).addClass("active");
        imgs[next].style.left=3.75+"rem";
        $(imgs[now]).animate({left:-3.75+"rem"},500)
        $(imgs[next]).animate({left:0+"rem"},500)
        now=next;
    }

    imgs.forEach(function (item,index) {
        item.ontouchmove=function (e) {
            clearInterval(t)
        }
        item.ontouchstart=function (e) {
            console.log(index);
            var touch = e.touches[0]
            var start=touch.clientX;
            document.ontouchmove=function (e) {
                var touch1 = e.touches[0]
                var end=touch1.clientX;
                document.ontouchend=function (e) {
                    if(end<start){
                        if(index==imgs.length-1){
                            var next1=0;
                        }
                        else {
                            var next1=index+1;
                        }
                        $(btns).removeClass("active");
                        $(btns[next1]).addClass("active");
                        imgs[next1].style.left=3.75+"rem";
                        $(imgs[index]).animate({left:-3.75+"rem"},500)
                        $(imgs[next1]).animate({left:0+"rem"},500)
                        now=next1;
                        // next=next1;
                    }
                    else {
                        if(index==0){
                            var next1=imgs.length-1;
                        }
                        else {
                            var next1=index-1;
                        }
                        $(btns).removeClass("active");
                        $(btns[next1]).addClass("active");
                        imgs[next1].style.left=-3.75+"rem";
                        $(imgs[index]).animate({left:3.75+"rem"},500)
                        $(imgs[next1]).animate({left:0+"rem"},500)
                        now=next1;
                        // next=index;
                    }
                    document.ontouchmove=null
                    document.ontouchend=null
                    t=setInterval(move,2000)
                }
            }
        }
    })
    
    // 倒计时
    var boxs=document.querySelectorAll(".img .time .box");
    djs();
    setInterval(djs,1000);
    function djs(){
        var arr=TIME();
        boxs.forEach(function (v,i){
            v.innerText=arr[i+2];
        })
    }
    function TIME(){
        let date=new Date(2020,6,27,19);
        let time=new Date();
        let times=Math.floor((date-time)/1000);
        let arr=[];
        let mth=Math.floor(times/(30*24*60*60));
        if (mth<10){
            mth="0"+mth;
        }
        arr.push(mth);
        times%=(30*24*60*60);
        let day=Math.floor(times/(24*60*60));
        if (day<10){
            day="0"+day;
        }
        arr.push(day);
        times%=(24*60*60);
        let hours=Math.floor(times/(60*60));
        if (hours<10){
            hours="0"+hours;
        }
        arr.push(hours);
        times%=(60*60);
        let m=Math.floor(times/60);
        if (m<10){
            m="0"+m;
        }
        arr.push(m);
        let s=times%60;
        if (s<10){
            s="0"+s;
        }
        arr.push(s);
        return arr;
    }

})