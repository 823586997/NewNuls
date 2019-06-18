<template>
  <div id="app">
    <Header></Header>
    <transition name="slide-fade">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
    name: '',
    components: { Header },
}
</script>


<style lang="scss">
@charset 'utf-8';

html,body,ul,li,ol,dl,dd,dt,p,h1,h2,h3,h4,h5,h6,form,fieldset,legend,img,input,figure,figcaption{margin:0;padding:0;}
h1,h2,h3,h4,h5,h6{font-size:16px;font-weight:normal;}
ul,ol,li{list-style:none;}
b,strong{font-weight:normal;}
em,i{font-style:normal;}
a,u{text-decoration: none;}
img{border:0;display:block;}
input{outline:none;}
*{box-sizing:border-box;}
.clearfix:after{clear:both; content:''; font-size:0; display:block; visibility:hidden; height:0}
html, body {
    height: 100%;
}
#app {
    padding-top: 60px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;
    min-height: 100%;
    background:#fafbfe;
}

/* 路由动画 */
.slide-fade{
    position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
    transition: all .5s ease;
}
.slide-fade-leave-active {
    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
    left:0;
    right: 0;
    //transform: translateX(20px);
    opacity: 0;
}  
</style>
