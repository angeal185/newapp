




function run() {
// load the models
faceapi.loadMtcnnModel('/')
faceapi.loadFaceRecognitionModel('/')

// try to access users webcam and stream the images
// to the video element
const videoEl = document.getElementById('inputVideo')
  navigator.getUserMedia(
    { video: {} },
    stream => videoEl.srcObject = stream,
    err => console.error(err)
  )

  const mtcnnForwardParams = {
    // number of scaled versions of the input image passed through the CNN
    // of the first stage, lower numbers will result in lower inference time,
    // but will also be less accurate
    maxNumScales: 10,
    // scale factor used to calculate the scale steps of the image
    // pyramid used in stage 1
    scaleFactor: 0.709,
    // the score threshold values used to filter the bounding
    // boxes of stage 1, 2 and 3
    scoreThresholds: [0.6, 0.7, 0.7],
    // mininum face size to expect, the higher the faster processing will be,
    // but smaller faces won't be detected
    minFaceSize: 20
  }


  const mtcnnResults = faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams)



  faceapi.drawDetection('overlay', mtcnnResults.map(res => res.faceDetection), { withScore: false })
  faceapi.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), { lineWidth: 4, color: 'red' })

  const alignedFaceBoxes = results.map(
  ({ faceLandmarks }) => faceLandmarks.align()
)

const alignedFaceTensors = extractFaceTensors(input, alignedFaceBoxes)

const descriptors = Promise.all(alignedFaceTensors.map(
  faceTensor => faceapi.computeFaceDescriptor(faceTensor)
))

// free memory
alignedFaceTensors.forEach(t => t.dispose())



};


let labels = ['sheldon' 'raj', 'leonard', 'howard']

const labeledFaceDescriptors = await Promise.all(
  labels.map(async label => {
    // fetch image data from urls and convert blob to HTMLImage element
    const imgUrl = `${label}.png`
    const img = await faceapi.fetchImage(imgUrl)

    // detect the face with the highest score in the image and compute it's landmarks and face descriptor
    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

    if (!fullFaceDescription) {
      throw new Error(`no faces detected for ${label}`)
    }

    const faceDescriptors = [fullFaceDescription.descriptor]
    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
  })
)


window.onload = function(){
  run()
}

async function onPlay(videoEl) {
  // run face detection & recognition
  // ...

  setTimeout(() => onPlay(videoEl))
}
