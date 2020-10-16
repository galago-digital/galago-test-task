<template>
  <div id="app" class="run-wrapper">
    <MainPage />
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';

export default {
  // компонент MainPage избыточен, т.к. здесь одна страница и есть
  name: 'App',
  components: {
    MainPage,
  },
};
</script>

<style media="screen">
/* <NULL> */
*{
  padding: 0;
  margin: 0;
  border: 0;
  font-family: Lato;
}
*,*:before,*:after{
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,:active{outline: none;}
a:focus,a:active{outline: none;}
/*
nav,footer,header,aside{display: block;}
имеет смысл для древних браузеров, не знающих этих элементов,
но тогда надо позаботится и fallback для display: flex - а этого нет.
Так что смысл теряется.
*/
nav,footer,header,aside{display: block;}
html,body{
  height: 100vh;
  width: 100vw;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  min-width: 1280px;
  min-height: 800px;
}
input,button,textarea{font-family:inherit;}
input::-ms-clear{display: none;}
button{cursor: pointer;}
button::-moz-focus-inner {padding:0;border:0;}
a, a:visited{text-decoration: none;}
a:hover{text-decoration: none;}
ul li{list-style: none;}
img{vertical-align: top;}
h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: 400;}
/* </NULL> */
/*    BASE    */
html,body {
  overflow-x: hidden;
  overflow-y: hidden;
  background: #FFBD00;
}
/*    </BASE>    */
</style>
