
const xdata = {
  default:{
    version: '1.0.0', // don't delete me
    origin: 'http://localhost:8000',
    params: true,
    error: '/error',
    base_path: '/dashboard',
    delete_meta: 10000,
    webmanifest: '',
    base_script_name: 'main',
    styles:[{
      href: './app/css/bootstrap.css',
      rel: 'stylesheet'
    },{
      href: './app/css/app.css',
      rel: 'stylesheet'
    },{
      href: './app/css/style.css',
      rel: 'stylesheet'
    }],

    js_head:[],
    js_body:[{
      src: './app/js/quagga.js'
    }, {
      src: './app/js/bootstrap.js'
    }],
    storage: {
      max_age: 9999999999,
      prefix: 'rt'
    },
    stream: {
      download: {
        type: 'text/plain',
        charset: 'utf-8'
      },
      fetch: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  },
  appdata: [],
  app: {
    name: 'Barcode',
    avatar: 'app/img/avatar/avatar.jpg',
    menu: {
      sb:[{
        "title": "Dashboard",
        "dest": "dashboard",
        "ico": "dashboard"
      }, {
        "title": "Contact",
        "dest": "contact",
        "ico": "contact_mail"
      }, {
        "title": "About",
        "dest": "about",
        "ico": "info_outline"
      }, {
        "title": "settings",
        "dest": "settings",
        "ico": "settings"
      }],
      navmenu: []
    }
  },
  dashboard: {
    msg: 'dashboard page'
  },
  settings: {
    msg: 'settings page'
  },
  contact: {
    msg: 'contact page'
  },
  about: {
    msg: 'about page'
  }
}

export { xdata }
