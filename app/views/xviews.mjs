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

    return tpl.portal();
  },
  settings(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  apps(stream, data){

    let item = x('div', {class: 'row'}),
    items = xdata.appdata;

    for (let i = 0; i < items.length; i++) {
      item.append(tpl.appcard(items[i]))
    }

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

    let ttl = x('div', {class: 'col-6'},
      x('h2', data.msg)
    ),
    srch = x('input', {
      type: 'text',
      class: 'form-control',
      placeholder: 'Search...',
      keyup(){

      },
      onfocus(evt){
        ttl.classList.add('hidden');
        evt.target.parentNode.parentNode.classList.remove('col-6');
      },
      onblur(evt){
        ttl.classList.remove('hidden');
        evt.target.parentNode.parentNode.classList.add('col-6');
      }
    }),
    item = x('div',
      x('div', {class: 'row'},
        ttl,
        x('div', {class: 'col col-6'},
          x('div', {class: 'input-group input-group-sm'},
            srch,
            x('button', {
              class: 'btn btn-outline-primary btn-sm',
              onclick(evt){
                let res = srch.value;
                if(typeof res === 'number'){
                  res = JSON.stringify(res)
                }

                if(res.length > 0){
                  router.rout('/news?title='+ res)
                }
              }
            }, x('span', {class: 'ico'}, 'search'))
          )
        ),
        x('div', {class: 'col-12'},
          x('hr')
        )
      )
    );

    stream.fetch('./app/data/news.json', function(err, res){
      if(err){return console.error(err)}
      res = res.json;


      if(data.search){
        let arr = data.search,
        str = arr[1],
        newArr = []



        if(arr[0] === 'author'){
          for (let i = 0; i < res.length; i++) {
            if(res[i].author === str){
              newArr.push(res[i]);
            }
          }
        } else if (arr[0] === 'category'){
          for (let i = 0; i < res.length; i++) {
            if(res[i].category === str){
              newArr.push(res[i]);
            }
          }
        } else if (arr[0] === 'title'){
          for (let i = 0; i < res.length; i++) {
            if(res[i].title.toLowerCase().includes(str.toLowerCase())){
              newArr.push(res[i]);
            }
          }
        }
        res = newArr;
      }

      for (let i = 0; i < res.length; i++) {
        item.append(tpl.newsPost(res[i], router))
      }
    })

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
