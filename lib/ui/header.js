export default function (window, text) {
  const headerElem = window.document.createElement('header')
  const titleElem = window.document.createElement('h1')
  titleElem.innerText = text || 'Facewall'
  headerElem.className = 'header'

  headerElem.appendChild(titleElem)


 

  window.addEventListener('scroll', () => {
    if(window.pageYOffset > 0){
      headerElem.classList.add('head')
      titleElem.classList.add('logo')
      titleElem.classList.remove('logo-rev')
    }else{
      headerElem.classList.remove('head')
      titleElem.classList.remove('logo')
      titleElem.classList.add('logo-rev')
    }
  })

  return headerElem
}
