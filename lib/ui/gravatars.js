import generateGravatarURL from '../gravatar-url'
import initModal from './modal'

const IMAGE_SIZE = 64
const MARGIN_IMAGES = 13
const EXTRA_ROWS = 5

export function createImages (window, numberOfImages) {
  return Array.apply(null, Array(numberOfImages)).map(() => gravatarImage(window))
}

export function randomFunction(imagesToCreate, arr){
  return [...Array(imagesToCreate / 4).keys()].map(() => (Math.floor(Math.random() * arr)))
}

export function loaderGravatars(window){
  const loader = window.document.createElement('div')
  loader.className = 'loader-container'

  return loader
}

export function gravatarImage (window) {
  
  const img = new window.Image()

  img.src = generateGravatarURL(IMAGE_SIZE)
  img.style.margin = MARGIN_IMAGES + 'px'


  img.addEventListener('click', (e) => {
    e.target.classList.toggle('is-highlighted')
    
    setTimeout(() => {
      e.target.classList.toggle('is-highlighted')

      initModal(window, e.target.src) 
  
    },1000)
  })

  return img
}

export function calculateNumberOfImages (window, root) {

  const currentImages = window.document.querySelectorAll('img').length
  const div = window.document.querySelector('.gravatars-container')

  const getLoader = window.document.querySelector('.loader-container')
  // to jest po to zeby nie powielalo elemntu "loader" 
  const elems = window.document.querySelectorAll('.loader-container')

  const width = div.offsetWidth + window.scrollX
  const height = window.innerHeight + window.scrollY

  const imagesPerRow = Math.floor(width / (IMAGE_SIZE + (2 * MARGIN_IMAGES)))
  const imageRows = Math.floor(height / IMAGE_SIZE) + EXTRA_ROWS

  root.style.width = (IMAGE_SIZE + (2 * MARGIN_IMAGES)) * imagesPerRow + 'px'


  // console.log(height > root.offsetHeight)
  if(height >= root.offsetHeight){
    if(elems.length <= 0){
      root.appendChild(loaderGravatars(window))
    }
  }else{
    if(getLoader){
      getLoader.parentNode.removeChild(getLoader)
    }
  }

  return imagesPerRow * imageRows - currentImages
}

export default function (window, root) {

  const imagesToCreate = calculateNumberOfImages(window, root)

  if (imagesToCreate <= 0) {
    return
  }  

  const arr = createImages(window, imagesToCreate)
  
  const result = randomFunction(imagesToCreate, arr.length)

  arr.forEach((image,i) => {
    if(imagesToCreate){
      result.map(index => {
        if(i === index){
          image.classList.add('wall')
        }
      })
    }
    root.appendChild(image)
  })

}
