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
  }
}

export { tpl }
