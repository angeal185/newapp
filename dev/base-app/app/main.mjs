import { router, x } from './modules/jsnode.mjs';
import { xdata } from './data/xdata.mjs';
import { ls } from './modules/storage.mjs';
import { tpl } from './views/tpl.mjs';

if(!ls.get('current')){
  ls.set('current', 'default')
}
//init 
let evt = new Event("init");

window.detach = {}

window.db = new PouchDB({
  name: xdata.db.name,
  adapter: xdata.db.adapter,
  revs_limit: xdata.db.revs_limit
});



window.addEventListener('init', function(){
  console.log('initiating app')
  router.init().listen().validate();
}, false)

router.on('/dashboard',  function(request, stream){
  stream.render('dashboard', function(err){
    if(err){return stream.renderErr();}
  })

})

.on('/settings', function(request, stream) {

  stream.render('settings', request.data, function(err){
    if(err){return stream.renderErr();}
  })

})

.on('/lists', function(request, stream) {

  stream.render('lists', request.data, function(err){
    if(err){return stream.renderErr();}
  })

})

.on('/contact', function(request, stream) {

  stream.render('contact', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})
.on('/about', function(request, stream) {

  stream.render('about', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})

db.get(xdata.db.base._id, function(err, doc) {
  if(err){
    console.log('db not found. creating...')
    db.put(xdata.db.base, function(err, res) {
      if(err){return console.log(err);}
      window.dispatchEvent(evt);
    });

  } else {
    window.dispatchEvent(evt);
  }
});
