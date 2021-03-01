import { router, x } from './modules/jsnode.mjs';
import { ls } from './modules/storage.mjs';

window.detach = {}

if(!ls.get('lists')){
  ls.set('lists', ['default'])
}

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
.init().listen().validate();
