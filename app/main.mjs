import { router, x } from './modules/jsnode.mjs';
import { utils } from './modules/utils.mjs';


router.on('/dashboard', function(request, stream){
  console.log(pouch.adapter); // prints 'idb'
  stream.render('dashboard', function(err){
    if(err){return stream.renderErr();}
  })

})
.on('/portal', function(request, stream) {

  stream.render('portal', request.data, function(err){
    if(err){return stream.renderErr();}
  })

})
.on('/store', function(request, stream) {

  stream.render('store', request.data, function(err){
    if(err){return stream.renderErr();}
  })

})
.on('/apps', function(request, stream) {

  stream.render('apps', request.data, function(err){
    if(err){return stream.renderErr();}
  })

})
.on('/settings', function(request, stream) {

  stream.render('settings', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})
.on('/account', function(request, stream) {

  stream.render('account', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})
.on('/login', function(request, stream) {

  stream.render('login', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})
.on('/register', function(request, stream) {

  stream.render('register', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})
.on('/logout', function(request, stream) {

  stream.render('logout', request.data, function(err){
    if(err){return stream.renderErr();}
  })
})
.on('/news', function(request, stream) {

  stream.render('news', request.data, function(err){
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

utils.onload();
