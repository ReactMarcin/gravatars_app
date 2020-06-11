import { emailFunc } from '../gravatar-url';

let index = 0;

export function uiModal(window, root){
     //  dodanie nowego elemntu 
     const modalContainer = window.document.createElement('div')
     modalContainer.className = 'modal'
     root.appendChild(modalContainer)

     const imageConatiner = window.document.createElement('div')
     imageConatiner.className = 'main'
     modalContainer.appendChild(imageConatiner)

     const imageModal = window.document.createElement('img')
     const close = window.document.createElement('span')
     const h3 = window.document.createElement('h3')
     const spiner = window.document.createElement('div')
     const nextBtn = window.document.createElement('button')
     const prevBtn = window.document.createElement('button')

     imageModal.className = 'modal-img'
     close.innerHTML = '&times;'
     h3.className = 'h3'
     close.className = 'close'
     spiner.className = 'spinner'
     nextBtn.className = 'next'
     nextBtn.innerHTML = '&#10095;'
     prevBtn.className = 'prev'
     prevBtn.innerHTML = '&#10094;'

     modalContainer.appendChild(close)
     modalContainer.appendChild(nextBtn)
     modalContainer.appendChild(prevBtn)

     imageConatiner.appendChild(imageModal)
     imageConatiner.appendChild(h3)
     imageConatiner.appendChild(spiner)

     return{
        imageConatiner, 
        modalContainer, 
        imageModal, 
        close, 
        h3, 
        spiner, 
        nextBtn, 
        prevBtn
     }
}

export function createEmails (window,numberOfImages){
    return [...Array(numberOfImages).keys()].map(() => ({ adrress: emailFunc(window) }))
}

export function currentImg(email, data, imageSrc, arr_img){
    
    const current_img = arr_img.find(i => i === imageSrc)

    arr_img.map((item,i) => {
        if(current_img === item){
          index = i
          data.h3.innerText = email[index].adrress

          data.spiner.style.opacity = 1

          setTimeout(() => {
            data.spiner.style.opacity = 0
            data.imageModal.style.boxShadow = '0 4px 18px 0 rgba(0,0,0,.12), 0 7px 10px -5px rgba(0,0,0,.15)'
          },1000)

          data.imageModal.src = arr_img[index]

        }
      })
}



export function nextSlide(email, data, arr_img){

    index ++
    if(index >= arr_img.length -1){
      index = 0
    }
    data.imageModal.style.display = 'none'
    data.h3.style.display = 'none'
    data.h3.innerText = email[index].adrress
    setTimeout(() => {
        data.spiner.style.opacity = 0
        data.imageModal.style.boxShadow = '0 4px 18px 0 rgba(0,0,0,.12), 0 7px 10px -5px rgba(0,0,0,.15)'
    }, 1000)

      setTimeout(() => {
        data.imageModal.style.display = 'flex'
        data.h3.style.display = ''
        data.spiner.style.opacity = 1
    },50)
}

export function prevSlide(email, data, arr_img){
    index --
    if(index < 0){
      index += arr_img.length -1
    }
    data.imageModal.style.display = 'none'
    data.h3.style.display = 'none'
    data.h3.innerText = email[index].adrress

    setTimeout(() => {
      data.spiner.style.opacity = 0
      data.imageModal.style.boxShadow = '0 4px 18px 0 rgba(0,0,0,.12), 0 7px 10px -5px rgba(0,0,0,.15)'
    }, 1000)
      setTimeout(() => {
        data.imageModal.style.display = 'flex'
        data.h3.style.display = ''
        data.spiner.style.opacity = 1
    },50)
}


export function initListener(email, data, arr_img){

      data.close.addEventListener('click', () => {
        data.modalContainer.parentNode.removeChild(data.modalContainer)
      })

      data.nextBtn.addEventListener('click', () => {
        nextSlide(email, data, arr_img)
        data.imageModal.src = arr_img[index]
      })
      
      data.prevBtn.addEventListener('click', () => {
        prevSlide(email, data, arr_img)
        data.imageModal.src = arr_img[index]
      })

}


export default function (window, imageSrc) {
    
    let arr_img = []

    const img = window.document.querySelectorAll('img')

    img.forEach((item) => arr_img.push(item.src))

    const email = createEmails(window, arr_img.length)

    const data = uiModal(window, root)

    initListener(email, data, arr_img)
  
    currentImg(email, data, imageSrc, arr_img)
    
}