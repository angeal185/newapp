import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { router } from '../modules/jsnode.mjs';
import { tpl } from './tpl.mjs';
import { utils } from '../modules/utils.mjs';

const xviews = {
  build(app_main){

    let toTop = x('div', {
      class: 'totop ico hidden',
      onclick: function(){
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }, 'keyboard_arrow_up')

    let item = x('main-view',
      tpl.sidebar(router),
      x('div', {id: 'main'},
        tpl.topbar(router),
        app_main
      ),
      tpl.toast(),
      toTop
    )

    window.addEventListener('scroll', utils.debounce(function(evt){
       let top = window.pageYOffset || document.scrollTop;
       if(top === NaN || !top){
         toTop.classList.add('hidden');
       } else if(toTop.classList.contains('hidden')){
         toTop.classList.remove('hidden');
       }
       top = null;
       return;
    }, 250))

    return item
  },
  error(stream, data){
    return x('code', stream.js(data))
  },

  //views
  dashboard(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  portal(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  settings(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  apps(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  store(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  store(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  account(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  login(stream, data){
    return tpl.login(router);
  },
  register(stream, data){
    return tpl.register(router);
  },
  logout(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  news(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  contact(stream, data){
    return tpl.contact();
  },
  about(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  }
}

export { xviews }
