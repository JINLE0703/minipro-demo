// components/movie-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    movieList: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapMore() {
      let type = '';
      switch (this.properties.title) {
        case '正在热映':
          type = 'in_theaters';
          break;
        case '即将上映':
          type = 'coming_soon';
          break;
        case '豆瓣Top250':
          type = 'top250';
          break;
      }
      this.triggerEvent('tapMore', {
        type
      });
    }
  }
})
