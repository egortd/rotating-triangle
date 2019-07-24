import Vue from 'vue';

export default () => {
  const point = new Vue({
    el: '#app',
    data: {
      message: '<h1>Hello, Username!</h1>',
    },
  });
  return point;
};
