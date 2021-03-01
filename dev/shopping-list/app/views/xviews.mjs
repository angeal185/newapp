import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { router } from '../modules/jsnode.mjs';
import { tpl } from './tpl.mjs';
import { utils } from '../modules/utils.mjs';

const xviews = {
  build(app_main){

    let toTop = x('div', {
      class: 'totop ico hidden',
      onclick: function(){
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }, 'keyboard_arrow_up')

    let item = x('main-view',
      tpl.sidebar(router),
      x('div', {id: 'main'},
        tpl.topbar(router),
        app_main
      ),
      tpl.toast(),
      toTop
    )

    window.addEventListener('scroll', utils.debounce(function(evt){
       let top = window.pageYOffset || document.scrollTop;
       if(top === NaN || !top){
         toTop.classList.add('hidden');
       } else if(toTop.classList.contains('hidden')){
         toTop.classList.remove('hidden');
       }
       top = null;
       return;
    }, 250))

    return item
  },
  error(stream, data){
    return x('code', stream.js(data))
  },

  //views
  dashboard(stream, data){

    let item;

    if(detach.dashboard){
      console.log('hit')
      item = detach.dashboard;
    } else {

      console.log('no hit')

      let mdl_close = x('span', {
          class: 'ico-cancel float-right',
          type: 'button',
          'data-bs-dismiss': 'modal',
          'aria-label': 'close'
        }
      )

      item = x('app-main',
        x('div', {class: 'container'},
          x('div', {class: 'row'},
            x('div', {class: 'col-lg-12'},
              x('div', {class: 'input-group'},
                x('input', {
                  id: 'scanner_input',
                  class: 'form-control',
                  placeholder: 'Click the button to scan an item',
                  type: 'text'
                }),
                x('button', {
                    class: 'btn btn-outline-primary',
                    type: 'button',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#livestream_scanner'
                  }, 'Scan'
                )
              ),


              x('div', {class: 'mt-4 btn-group w-100', role: 'group'},
                x('button', {
                  class: 'btn btn-primary',
                  type: 'button',
                  onclick(){

                  }
                }, 'Add'),
                x('button', {
                  class: 'btn btn-primary',
                  type: 'button',
                  onclick(){

                  }
                }, 'Edit'),
                x('button', {
                  class: 'btn btn-primary',
                  type: 'button',
                  onclick(){

                  }
                }, 'Remove'),
              )

            )
          ),
          x('div', {class: 'modal', id: 'livestream_scanner'},
            x('div', {class: 'modal-dialog modal-xl'},
              x('div', {class: 'modal-content'},
                x('div', {class: 'modal-header'},
                  x('h4', {class: 'modal-title'}, 'Barcode Scanner'),
                  mdl_close
                ),
                x('div', {class: 'modal-body'},
                  x('div', {class: 'container-fluid'},
                    x('div', {id: 'interactive', class: 'viewport'},
                      x('div', {class: 'diode'},
                        x('div', {class: 'laser'})
                      )
                    )
                  ),
                  x('div', {class: 'error'})
                ),
                x('div', {class: 'modal-footer'},
                  x('button', {
                    class: 'btn btn-primary',
                    type: 'button',
                    'data-bs-dismiss': 'modal',
                    'aria-label': 'close'
                  }, 'Close')
                )
              )
            )
          )
        )

      )


      window.onload = function(){


        // Create the QuaggaJS config object for the live stream
        var liveStreamConfig = {
          inputStream: {
            type: 'LiveStream',
            constraints: {
              width: { min: 640 },
              height: { min: 480 },
              aspectRatio: { min: 1, max: 100 },
              facingMode: 'environment' // or 'user' for the front camera
            }
          },
          locator: {
            patchSize: 'medium',
            halfSample: true
          },
          numOfWorkers: navigator.hardwareConcurrency
            ? navigator.hardwareConcurrency
            : 4,
          decoder: {
            readers: [{ format: 'ean_reader', config: {} }]
          },
          locate: true
        };


        var mymodal = document.getElementById('livestream_scanner')
        // Start the live stream scanner when the modal opens
        mymodal.addEventListener('shown.bs.modal', function(e) {
          Quagga.init(liveStreamConfig, function(err) {
            if (err) {return console.error(err)
              Quagga.stop();
              return;
            }
            Quagga.start();
          });
        });

        mymodal.addEventListener('hide.bs.modal', function() {
          if (Quagga) {
            Quagga.stop();
          }
        });

        // Make sure, QuaggaJS draws frames an lines around possible
        // barcodes on the live stream
        Quagga.onProcessed(function(result) {
          var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

          if (result) {
            if (result.boxes) {
              drawingCtx.clearRect(
                0,
                0,
                parseInt(drawingCanvas.getAttribute('width')),
                parseInt(drawingCanvas.getAttribute('height'))
              );
              result.boxes
                .filter(function(box) {
                  return box !== result.box;
                })
                .forEach(function(box) {
                  Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                    color: '#20ec39',
                    lineWidth: 4
                  });
                });
            }

            if (result.box) {
              Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                color: '#20ec39',
                lineWidth: 4
              });
            }

            if (result.codeResult && result.codeResult.code) {
              Quagga.ImageDebug.drawPath(
                result.line,
                { x: 'x', y: 'y' },
                drawingCtx,
                { color: 'red', lineWidth: 4 }
              );
            }
          }
        });

        // Once a barcode had been read successfully, stop quagga and
        // close the modal after a second to let the user notice where
        // the barcode had actually been found.
        Quagga.onDetected(function(result) {
          if (result.codeResult.code) {
            console.log(result.codeResult.code)
            document.getElementById('scanner_input').value = result.codeResult.code;

            Quagga.stop();
            setTimeout(function() {

              mdl_close.click()

            }, 1000);
          }
        });



        detach.dashboard = item;

      }
    }

    return item;
  },
  lists(stream, data){

    let sel = x('select', {class: 'form-select', multiple: '' },
      x('option', {selected: '', value: 0}, 'Default')
    )

    let item = x('div',
      x('div', {class: 'mt-4'},
        sel
      ),

      x('div', {class: 'mt-4 btn-group w-100', role: 'group'},
        x('button', {
          class: 'btn btn-primary',
          type: 'button',
          onclick(){

          }
        }, 'Add'),
        x('button', {
          class: 'btn btn-primary',
          type: 'button',
          onclick(){

          }
        }, 'Edit'),
        x('button', {
          class: 'btn btn-primary',
          type: 'button',
          onclick(){

          }
        }, 'Remove'),
      )

    );

    return item;
  },
  settings(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  },
  contact(stream, data){
    return tpl.contact();
  },
  about(stream, data){
    let item = x('div', x('p', data.msg));

    return item;
  }
}

export { xviews }
