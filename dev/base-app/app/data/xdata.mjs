
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
      href: './app/css/main.css',
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
  appdata: [],
  db: {
    name: 'listdb',
    adapter: 'idb',
    revs_limit: 1,
    base: {
      _id: 'list',
      data: [{
        name: 'default',
        items: [{
          date: 1618307658129,
          title: 'Test todo',
          note: 'Test notes'
        }]
      }]
    }
  },
  app: {
    name: 'Todo',
    avatar: 'app/img/avatar/avatar.jpg',
    menu: {
      sb:[{
        "title": "Dashboard",
        "dest": "dashboard"
      }, {
        "title": "Lists",
        "dest": "lists"
      }, {
        "title": "Contact",
        "dest": "contact"
      }, {
        "title": "About",
        "dest": "about"
      }, {
        "title": "settings",
        "dest": "settings"
      }],
      navmenu: []
    }
  },
  dashboard: {
    msg: 'dashboard page'
  },
  lists: {
    msg: 'lists page'
  },
  settings: {
    msg: 'settings page'
  },
  contact: {
    msg: 'contact page'
  },
  about: {
    msg: '© 2021 Nomatec Labs',
    img: './app/img/logo_full_dark.png'
  }
}

export { xdata }
