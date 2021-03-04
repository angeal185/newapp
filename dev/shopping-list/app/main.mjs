import { router, x } from './modules/jsnode.mjs';
import { ls } from './modules/storage.mjs';


let evt = new Event("init");

window.detach = {}
window.db = new PouchDB({
  name: 'listdb',
  adapter: 'idb',
  revs_limit: 1
});

if(!ls.get('current')){
  ls.set('current', 'default')
}

window.addEventListener('init', function(){
  console.log('initiating app')
  router.init().listen().validate();
}, false)

router.on('/dashboard', function(request, stream){
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

db.get('list', function(err, doc) {
  if(err){

    db.put({
      _id: 'list',
      data: [{
        name: 'default',
        items: []
      }]
    }, function(err, res) {
      if(err){return console.log(err);}
      window.dispatchEvent(evt);
    });

  } else {
    window.dispatchEvent(evt);
  }
});
