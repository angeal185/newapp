import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { utils } from '../modules/utils.mjs';
import { ls,ss } from '../modules/storage.mjs';

const tpl = {
  sidebar(router){

    let item = x('div', {id: 'sidebar', class: ''},
      x('div', {class: 'sidebar-wrapper'},
        x('div', {class: 'sidebar-header'},
          x('h1', xdata.app.name)
        ),
        x('div', {class: 'sidebar-menu'},
          function(){
            let lst = x('ul', {class: 'menu'},
              x('li', {class: 'sidebar-title'}, 'Menu'),
            ),
            items = xdata.app.menu.sb

            for (let i = 0; i < items.length; i++) {
              lst.append(tpl.sb_link(items[i], router))
            }

            items = null;

            return lst;
          }
        ),
        x('div', {
            class: 'sidebar-toggler btn x',
            onclick(){
              let event = new Event('toggle-sidebar');
              window.dispatchEvent(event);
            }
          },
          x('i', {class: 'ico'}, 'close')
        )
      )
    )

    window.addEventListener('toggle-sidebar', function (e) {
      item.classList.toggle('active')
    }, false);

    return item
  },
  sb_link(obj, router){

    let item = x('div', {class: 'sidebar-item'},
      x('div', {
          class: 'sidebar-link',
          onclick(){
            router.rout('/'+ obj.dest);
            let event = new Event('toggle-sidebar');
            window.dispatchEvent(event);
          }
        },
        x('i', {class: 'ico'}, obj.ico),
        x('span', obj.title),
        x('span', {class: 'ico text-right w-100'}, 'chevron_right')
      )
    )
    return item;
  },
  topbar(router){

    let item = x('nav', {class: 'navbar navbar-header navbar-expand navbar-light'},
      x('div', {
          class: 'sidebar-toggler',
          onclick(){
            let event = new Event('toggle-sidebar');
            window.dispatchEvent(event);
          }
        },
        x('span', {class: 'navbar-toggler-icon cp'}),
      ),
      x('div', {class: 'collapse navbar-collapse'},
        x('ul', {class: 'navbar-nav d-flex align-items-center ml-auto'},
          tpl.theme(),
          tpl.notifications(),
          tpl.navmenu(router)
        )
      )
    )

    return item;
  },
  notifications(){

    let item = x('li', {class: 'dropdown nav-icon cp'},
      x('a', {
          class: 'nav-link  dropdown-toggle nav-link-lg nav-link-user',
          'data-bs-toggle': 'dropdown',
        },
        x('div', {class: 'd-lg-inline-block'},
          x('i', {class: 'ico'}, 'notifications_none')
        )
      ),
      x('div', {class: 'dropdown-menu dropdown-menu-right dropdown-menu-large'},
        x('h6', {class: 'py-2 px-4'}, 'Notifications'),
        x('ul', {class: 'list-group rounded-none'})
      )
    )

    return item;
  },
  theme(){
    let ico = x('i', {class: 'ico'}),
    darkstyle = x('link', {href: './app/css/dark.css', rel: 'stylesheet'}),
    item = x('li', {
        class: 'nav-icon dropdown cp',
        onclick(evt){
          if(ls.get('darkmode')){
            ls.set('darkmode', false);
          } else {
            ls.set('darkmode', true);
          }
          window.dispatchEvent(new CustomEvent('dark-mode', {detail:true}));
        }
      },
      x('a', {class: 'nav-link nav-link-lg nav-link-user'},
        x('div', {class: 'd-lg-inline-block'}, ico)
      )
    )

    window.addEventListener('dark-mode', function (evt) {
      console.log('hit')
      if(!ls.get('darkmode')){
        darkstyle.remove()
        ico.textContent = 'brightness_7';
      } else {
        document.head.append(darkstyle)
        ico.textContent = 'brightness_4';
      }
    }, false);




    return item;
  },
  note(){


/*
      <li class="list-group-item border-0 align-items-start">
          <div class="avatar bg-success mr-3">
              <span class="avatar-content"><i class="ico">person</i></span>
          </div>
          <div>
              <h6 class='text-bold'>New notification</h6>
              <p class='text-xs'>
                  some message here
              </p>
          </div>
      </li>
*/
  },
  navmenu(router){

    let item = x('li', {class: 'dropdown cp'},
      x('a', {
          id: 'dropdownMenuButton',
          'data-bs-toggle': 'dropdown',
          class: 'nav-link dropdown-toggle nav-link-lg nav-link-user',
          'data-toggle': 'dropdown'
        },
        x('div', {class: 'avatar mr-1'},
          x('img', {src: xdata.app.avatar})
        ),
        x('div', {class: 'd-none d-md-block d-lg-inline-block'}, 'Login')
      ),
      function(){
        let lst = x('div', {
          class: 'dropdown-menu dropdown-menu-right',
          'aria-labelledby':'dropdownMenuButton'
        }),
        items = xdata.app.menu.navmenu

        for (let i = 0; i < items.length; i++) {
          lst.append(tpl.nm_link(items[i], router))
        }

        lst.append(
          x('div', {class: 'dropdown-divider'}),
          x('a', {
              class: 'dropdown-item',
              onclick(){
                router.rout('/login')
              }
            },
            x('i', {class: 'ico'}, 'exit_to_app'),
            x('span', {class: 'float-right'}, 'Login')
          )
        )

        return lst;
      }

    )

    return item;

/*
    <li class="dropdown">
        <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
            <div class="avatar mr-1">
                <img src="app/images/avatar/avatar.jpg">
            </div>
            <div class="d-none d-md-block d-lg-inline-block">Username here</div>
        </a>
        <div class="dropdown-menu dropdown-menu-right">


            <a class="dropdown-item" href="#">
              <i class="ico">exit_to_app</i>
              <span class="float-right">Logout</span>
            </a>

        </div>
    </li>
    */
  },
  nm_link(obj, router){

    let item = x('a', {
        class: 'dropdown-item',
        onclick(){
          router.rout('/'+ obj.dest);

        }
      },
      x('i', {class: 'ico'}, obj.ico),
      x('span', {class: 'float-right'}, obj.dest)
    )

    return item;
  },
  login(router){

    let item = x('div',
      x('div', {class: 'card mb-4 text-center'},
        x('div', {class: 'card-body'},
          x('h3', 'Login'),
          x('div', {class: 'row'},
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'username'),
                x('input', {class: 'form-control', type: 'text'})
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'password'),
                x('input', {class: 'form-control', type: 'password'})
              )
            )
          ),
          x('div', {class: 'mt-4 mb-4'},
            x('div', {class: 'form-check float-left'},
              x('input', {
                class: 'form-check-input',
                type: 'checkbox',
                id: 'remembercheck',
                value: '',
                onclick(){

                  if(this.checked){
                    localStorage.setItem('storeUser', true)
                    return console.log('checked')
                  }
                  localStorage.setItem('storeUser', false)
                  console.log('not checked')
                }
              }),
              x('label', {class: 'form-check-label', for: 'remembercheck'}, 'Remember username')
            ),
            x('button', {
              type: 'button',
              class: 'btn btn-outline-success float-right',
              onclick(){
                utils.addSpin(this);
              }
            },'Login')
          )

        )
      ),
      x('div', {class: 'card mb-4'},
        x('div', {class: 'card-body'},
          x('h6', {class: 'mb-4'},
            'Dont have an account?',
            x('button', {
              type: 'button',
              class: 'btn btn-outline-primary float-right btn-sm',
              onclick(){
                router.rout('/register')
              }
            }, 'Register')
          ),
          x('h6', 'Forgot your password?',
            x('button', {
              type: 'button',
              class: 'btn btn-outline-primary float-right btn-sm',
              'data-bs-toggle': 'modal',
              'data-bs-target': '#staticBackdrop',
              onclick(){
                utils.addSpin(this);
              }
            }, 'Recover')
          )
        )
      ),
      tpl.recover_mdl()
    )

    return item;
  },
  recover_mdl(){
    let item = x('div', {
        id: 'staticBackdrop',
        class: 'modal fade',
        'data-bs-backdrop': 'static'
      },
      x('div', {class: 'modal-dialog'},
        x('div', {class: 'modal-content'},
          x('div', {class: 'modal-header'},
            x('h5', {class: 'modal-title'}, 'Recover password'),
            x('span', {
              class: 'ico cp',
              'data-bs-dismiss': "modal"
            }, 'close')
          ),
          x('div', {class: 'modal-body'},
            x('h6', 'Please enter your email address to reset your password.'),
            x('input', {class: 'form-control mb-4', type: 'email', placeholder: 'enter email'}),
            x('button', {
              type: 'button',
              class: 'btn btn-outline-primary float-right btn-sm',
              onclick(){

                //validate and send email here


                this.parentNode.append(x('p', 'Please check your email for password reset instructions'));
                this.remove();

              }
            }, 'Send')
          )
        )
      )
    )

    return item;
  },
  register(router){

    let obj = {}

    let item = x('div',
      x('div', {class: 'card mb-4 text-center'},
        x('div', {class: 'card-body'},
          x('h3', 'Register'),
          x('div', {class: 'row'},
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'first name'),
                x('input', {
                  class: 'form-control',
                  type: 'text',
                  keyup(evt){
                    obj.firstname = evt.target.textContent;
                  }
                })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'last name'),
                x('input', {
                  class: 'form-control',
                  type: 'text',
                  keyup(evt){
                    obj.lastname = evt.target.textContent;
                  }
                })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'email'),
                x('input', {
                  class: 'form-control',
                  type: 'email',
                  keyup(evt){
                    obj.email = evt.target.textContent;
                  }
                })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'username'),
                x('input', {
                  class: 'form-control',
                  type: 'text',
                  keyup(evt){
                    obj.username = evt.target.textContent;
                  }
                })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'password'),
                x('input', {
                  class: 'form-control',
                  type: 'password',
                  keyup(evt){
                    obj.password = evt.target.textContent;
                  }
                })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 're-enter password'),
                x('input', {
                  class: 'form-control',
                  type: 'password',
                  keyup(evt){
                    let tst = evt.target.textContent;
                  }
                })
              )
            )
          ),
          x('div', {class: 'mt-4 mb-4'},
            x('div', {class: 'form-check float-left'},
              x('input', {
                class: 'form-check-input',
                type: 'checkbox',
                id: 'remembercheck',
                value: '',
                onclick(){

                }
              }),
              x('label', {class: 'form-check-label', for: 'remembercheck'}, 'Signup for newsletter?')
            ),
            x('button', {
              type: 'button',
              class: 'btn btn-outline-success float-right',
              onclick(){
                utils.addSpin(this);
                console.log(obj)
              }
            }, 'Register')
          )

        )
      )
    )

    return item;
  },
  contact(){
    let item = x('div',
      x('div', {class: 'card mb-4 text-center'},
        x('div', {class: 'card-body'},
          x('h3', 'Contact'),
          x('div', {class: 'row'},
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'name'),
                x('input', {class: 'form-control', type: 'text'})
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'email'),
                x('input', {
                  class: 'form-control',
                  type: 'email'
                })
              )
            ),
            x('div', {class: 'col-12'},
              x('div', {class: 'mt-4 form-group'},
                x('label', 'message'),
                x('textarea', {class: 'form-control', rows: 8})
              )
            )
          ),
          x('div', {class: 'mt-4 mb-4'},
            x('button', {
              type: 'button',
              class: 'btn btn-outline-success float-right',
              onclick(){
                utils.addSpin(this);
              }
            },'Send')
          )

        )
      )
    )

    return item;
  },
  toast(){

    let item = x('div', {class: 'toast-box'});

    window.addEventListener('toasty', function(evt){
      let ele = tpl.toasty(evt.detail);
      setTimeout(function(){
        ele.classList.add('fadeOutRightBig');
        setTimeout(function(){
          ele.remove();
        },1000)
      },5000)
      item.append(ele)
    })

    return item;

  },
  toasty(obj){
    let ele = x('div', {
        class: 'toast d-flex align-items-center text-white bg-'+ obj.sel +' border-0 ani fadeInUp'
      },
      x('div', {class: 'toast-body'}, obj.data)
    )

    setTimeout

    return ele
  },
  newsPost(obj, router){
    let item = x('div', {class: ''},
      x('h3', obj.title),
      x('p', obj.body),
      x('span', {class: 'mr-4', title: 'author'},
        x('i', {class: 'ico'}, 'person'),
        x('span', {
          class: 'cp',
          onclick(){
            router.rout('/news?author='+ obj.author)
          }
        }, obj.author)
      ),
      x('span', {class: 'mr-4', title: 'date'},
        x('i', {class: 'ico'}, 'date_range'),
        x('span', {
          class: 'cp',
          onclick(){
            router.rout('/news?sort=date')
          }
        }, utils.format_date(obj.date))
      ),
      x('span', {class: 'mr-4', title: 'category'},
        x('i', {class: 'ico'}, 'local_offer'),
        x('span', {
          class: 'cp',
          onclick(){
            router.rout('/news?category='+ obj.category)
          }
        }, obj.category)
      ),
      x('hr')
    )

    return item;
  },
  portal(router, cat){

    let item;

    if(cat === 'home'){

      item = x('div', {class: 'row justify-content-center'},
        x('div', {class: 'col-12'},
          x('h3', 'Your Weather')
        ),

        tpl.weather()
      )

    } else if(cat === 'audio'){

      item = x('div', {class: 'row justify-content-center'},

        x('div', {class: 'col-12'},
          x('h3', 'Your Spotify')
        ),
        tpl.spotify('track/4xkOaSrkexMciUUogZKVTS'),
        tpl.spotify('track/7lQ8MOhq6IN2w8EYcFNSUk'),
        tpl.spotify('track/3CpoeW0cZSDzIRv5z34F87'),
        tpl.spotify('track/4woTEX1wYOTGDqNXuavlRC'),

        tpl.spotify('album/2cWBwpqMsDJC1ZUwz813lo'),
        tpl.spotify('album/78guAsers0klWl6RwzgDLd?si=IQRFTDx7QTyM0hqBT3UIUA'),
        tpl.spotify('artist/6C0KWmCdqrLU2LzzWBPbOy'),
        tpl.spotify('artist/1vCWHaC5f2uS3yhpwWbIA6'),

        x('div', {class: 'col-12'},
          x('h3', 'Your Soundcloud')
        ),
        tpl.soundcloud('tracks/256257141'),
        tpl.soundcloud('tracks/256256844'),
        tpl.soundcloud('tracks/256256823'),
        tpl.soundcloud('tracks/39970329'),

        tpl.soundcloud('playlists/923302972'),
        tpl.soundcloud('playlists/4374638'),
        tpl.soundcloud('playlists/602892573'),
        tpl.soundcloud('playlists/556887426'),

        x('div', {class: 'col-12'},
          x('h3', 'Your Youtube')
        ),
        tpl.youtube('j1F5dLm8bxk'),
        tpl.youtube('Qzs37Fo6WVQ'),
        tpl.youtube('d26usZr4wSg'),
        tpl.youtube('o2q0qhnQdJk')


      )
    }


    item.append(x('div', {class: 'rs-menu'},
      x('i', {
        class: 'ico',
        onclick(){
          router.rout('/portal?category=home')
        }
      }, 'home'),
      x('i', {
        class: 'ico',
        onclick(){
          router.rout('/portal?category=audio')
        }
      }, 'music_video'),
    ))

    return item


 },
  soundcloud(src){

    let item = x('div', {class: 'col-xs-12 col-md-6 col-lg-3 text-center mb-4'},
      x('iframe', {
        class: 'w-100 h-100 vh-100',
        scrolling: 'no',
        frameborder: 'no',
        allow: 'autoplay',
        sandbox: "allow-same-origin allow-scripts",
        src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ src +'&color=%235a5858&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true&download=false&sharing=false&buying=false'
      })
    )
    return item;

  },
  youtube(src){

    let item = x('div', {class: 'col-xs-12 col-md-6 col-lg-3 text-center mb-4'},
      x('iframe', {
        class: 'w-100 h-100 vh-100',
        scrolling: 'no',
        frameborder: 'no',
        sandbox: "allow-same-origin allow-scripts allow-presentation",
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        src: 'https://www.youtube.com/embed/'+ src +'?modestbranding=1&loop=1'
      })
    )

    return item
  },
  vimeo(src){

    let item = x('div', {class: 'col-xs-12 col-md-6 col-lg-3 text-center mb-4'},
      x('iframe', {
        class: 'w-100 h-100',
        scrolling: 'no',
        frameborder: 'no',
        allow: 'autoplay',
        sandbox: "allow-same-origin allow-scripts",
        src: 'https://player.vimeo.com/video/'+ src
      })
    )

    return item
  },
  spotify(src){


    let item = x('div', {class: 'col-xs-12 col-md-6 col-lg-3 text-center mb-4'},
      x('iframe', {
        class: 'w-100 h-100 vh-100',
        scrolling: 'no',
        frameborder: 'no',
        allow: 'encrypted-media',
        allowtransparency: 'true',
        sandbox: 'allow-same-origin allow-scripts',
        src: 'https://open.spotify.com/embed/'+ src
      })
    )

    return item
  },
  weather(){

    let item = x('a', {
      class: 'weatherwidget-io mb-4',
      href: 'https://forecast7.com/en/n37d81144d96/melbourne/',
      'data-label_1':'MELBOURNE',
      'data-label_2':'WEATHER',
      'data-font':'Ubuntu',
      'data-theme':'beige',
      'data-textcolor':'#585858',
      'data-highcolor':'#585858',
      'data-lowcolor':'#585858',
      'data-suncolor':'#585858',
      'data-mooncolor':'#585858',
      'data-cloudcolor':'#585858',
      'data-raincolor':'#585858',
      'data-snowcolor':'#585858'
    })

    ;function __weatherwidget_init() {
      var a = [item],
        i = [];
      if (0 !== a.length) {
        for (var t = function(t) {
            var e = a[t],
              o = {};
            o.id = "weatherwidget-io-" + t, o.href = e.href, o.label_1 = e.getAttribute("data-label_1"), o.label_2 = e.getAttribute("data-label_2"), o.font = e.getAttribute("data-font"), o.icons = e.getAttribute("data-icons"), o.mode = e.getAttribute("data-mode"), o.days = e.getAttribute("data-days"), o.theme = e.getAttribute("data-theme"), o.basecolor = e.getAttribute("data-basecolor"), o.accent = e.getAttribute("data-accent"), o.textcolor = e.getAttribute("data-textcolor"), o.textAccent = e.getAttribute("data-textAccent"), o.highcolor = e.getAttribute("data-highcolor"), o.lowcolor = e.getAttribute("data-lowcolor"), o.suncolor = e.getAttribute("data-suncolor"), o.mooncolor = e.getAttribute("data-mooncolor"), o.cloudcolor = e.getAttribute("data-cloudcolor"), o.cloudfill = e.getAttribute("data-cloudfill"), o.raincolor = e.getAttribute("data-raincolor"), o.snowcolor = e.getAttribute("data-snowcolor"), o.windcolor = e.getAttribute("data-windcolor"), o.fogcolor = e.getAttribute("data-fogcolor"), o.thundercolor = e.getAttribute("data-thundercolor"), o.hailcolor = e.getAttribute("data-hailcolor"), o.dayscolor = e.getAttribute("data-dayscolor"), o.tempcolor = e.getAttribute("data-tempcolor"), o.desccolor = e.getAttribute("data-desccolor"), o.label1color = e.getAttribute("data-label1color"), o.label2color = e.getAttribute("data-label2color"), o.shadow = e.getAttribute("data-shadow"), o.scale = e.getAttribute("data-scale"), (r = document.getElementById(o.id)) && e.removeChild(r), i[o.id] = document.createElement("iframe"), i[o.id].setAttribute("id", o.id), i[o.id].setAttribute("class", "weatherwidget-io-frame"), i[o.id].setAttribute("title", "Weather Widget"), i[o.id].setAttribute("scrolling", "no"), i[o.id].setAttribute("frameBorder", "0"), i[o.id].setAttribute("width", "100%"), i[o.id].setAttribute("src", "https://weatherwidget.io/w/"), i[o.id].style.display = "block", i[o.id].style.position = "absolute", i[o.id].style.top = "0", i[o.id].onload = function() {
              i[o.id].contentWindow.postMessage(o, "https://weatherwidget.io")
            }, e.style.display = "block", e.style.position = "relative", e.style.height = "150px", e.style.padding = "0", e.style.overflow = "hidden", e.style.textAlign = "left", e.style.textIndent = "-299rem", e.appendChild(i[o.id])
          }, e = 0, o = Math.min(a.length, 10); e < o; e++) {
          var r;
          t(e)
        }
        window.addEventListener("message", function(t) {
          "https://weatherwidget.io" === t.origin && i[t.data.wwId] && i[t.data.wwId].parentNode && (i[t.data.wwId].style.height = t.data.wwHeight + "px", i[t.data.wwId].parentNode.style.height = t.data.wwHeight + "px")
        })
      } else setTimeout(__weatherwidget_init, 1500)
    }
    setTimeout(__weatherwidget_init, 100);

    return item;

  },
  appcard(obj){

    let item = x('div', {class: 'col-xs-12 col-md-6, col-lg-3'},
      x('div', {class: 'card'},
        x('img', {class: 'card-img-top', src: obj.img}),
        x('div',{class: 'card-body'},
          x('h5',{class: 'card-title'},obj.title),
          x('small', 'version: '+ obj.version),
          x('p', {class: 'card-text'}, obj.description)
        ),
        x('div', {class: 'card-footer'},
          x('button', {
            class: 'btn btn-outline-danger btn-sm',
            type: 'text',
            onclick(){

            }
          }, 'Remove'),
          x('button', {
            class: 'btn btn-outline-primary btn-sm float-right',
            type: 'text',
            onclick(){

            }
          }, 'Launch')
        )
      )
    )
    return item;
  },
  storecard(obj){

    let item = x('div', {class: 'col-xs-12 col-md-6, col-lg-3'},
      x('div', {class: 'card'},
        x('img', {class: 'card-img-top', src: obj.img}),
        x('div',{class: 'card-body'},
          x('h5',{class: 'card-title'},obj.title),
          x('small', 'version: '+ obj.version),
          x('p', {class: 'card-text'}, obj.description)
        ),
        x('div', {class: 'card-footer'},
          x('button', {
            class: 'btn btn-outline-primary btn-sm float-right',
            type: 'text',
            onclick(){

            }
          }, 'Install')
        )
      )
    )
    return item;
  }
}

export { tpl }
