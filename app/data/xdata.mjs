
const xdata = {
  default:{
    version: '1.0.0', // don't delete me
    origin: 'http://localhost:8000',
    params: true,
    error: '/error',
    base_path: '/dashboard',
    delete_meta: 10000,
    webmanifest: './manifest.webmanifest',
    base_script_name: 'main',
    styles:[{
      href: './app/css/bootstrap.css',
      rel: 'stylesheet'
    },{
      href: './app/css/app.css',
      rel: 'stylesheet'
    },{
      href: './app/css/ico.css',
      rel: 'stylesheet'
    },{
      href: './app/css/style.css',
      rel: 'stylesheet'
    }],

    js_head:[],
    js_body:[{
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
  app: {
    name: 'APPNAME',
    avatar: 'app/img/avatar/avatar.jpg',
    menu: {
      sb:[{
        "title": "Dashboard",
        "dest": "dashboard",
        "ico": "dashboard"
      }, {
        "title": "Portal",
        "dest": "portal",
        "ico": "grid_on"
      }, {
        "title": "Apps",
        "dest": "apps",
        "ico": "apps"
      }, {
        "title": "Store",
        "dest": "store",
        "ico": "store"
      }, {
        "title": "News",
        "dest": "news?sort=date",
        "ico": "chrome_reader_mode"
      }, {
        "title": "Contact",
        "dest": "contact",
        "ico": "contact_mail"
      }, {
        "title": "About",
        "dest": "about",
        "ico": "info_outline"
      }],
      navmenu: [{
        "title": "account",
        "dest": "account",
        "ico": "person"
      }, {
        "title": "mail",
        "dest": "mail",
        "ico": "mail"
      }, {
        "title": "settings",
        "dest": "settings",
        "ico": "settings"
      }]
    }
  },
  portal: {
    msg: 'portal page'
  },
  dashboard: {
    msg: 'dashboard page'
  },
  settings: {
    msg: 'settings page'
  },
  apps: {
    msg: 'apps page'
  },
  store: {
    msg: 'store page'
  },
  store: {
    msg: 'store page'
  },
  account: {
    msg: 'account page'
  },
  login: {
    msg: 'login page'
  },
  register: {
    msg: 'register page'
  },
  logout: {
    msg: 'logout page'
  },
  news: {
    msg: 'News feed'
  },
  contact: {
    msg: 'contact page'
  },
  about: {
    msg: 'about page'
  }
}

export { xdata }
