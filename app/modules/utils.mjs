import { x } from './xscript.mjs';

const utils = {
  get(url, cb){

    fetch(url, {
      method: 'GET'
    })
    .then(function(res){
      console.log(res)

      if(res.status > 199 && res.status < 300){
        return res.json().then(function(data){
          cb(false, data);
        });
      }

      throw res.status
    })
    .catch(function(err){
      cb(err)
    });

  },
  onload(){

    window.onload = function() {

      //resize
      let w = window.innerWidth;
      if(w < 768) {
          console.log('widthnya ', w);
          document.getElementById('sidebar').classList.remove('active');
      }

      //darkmode check
      window.dispatchEvent(new CustomEvent('dark-mode', {detail:false}));

      window.dispatchEvent(new CustomEvent('toasty', {detail:{sel: 'primary', data: 'test toast!'}}));
    }

  },
  addSpin(dest){
    let item = x('div', {class:'spinner-grow spinner-grow-sm ml-2', role:'status'})
    dest.append(item);
    setTimeout(function(){
      item.remove();
    },2000)
  },
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments,
      later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      },
      callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow){
        func.apply(context, args);
      }
    }
  },
}

export { utils }
