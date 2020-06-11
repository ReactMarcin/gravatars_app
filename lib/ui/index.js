import header from './header'
import gravatars from './gravatars'
import bodyLoader from './body_loader'

export function setupListeners (window, gravatarContainer) {
  window.addEventListener('scroll', () => {
    gravatars(window,gravatarContainer)
  })

  window.addEventListener('resize', () => {
    gravatars(window, gravatarContainer)
  })


  root.appendChild(bodyLoader(window))
  const getLoader = window.document.querySelector('.body-loader')
  window.addEventListener('load', () => {
    getLoader.parentNode.removeChild(getLoader)
  })
}

export function init (window, root) {
  root.appendChild(header(window))

  const gravatarContainer = window.document.createElement('div')
  gravatarContainer.classList.add('gravatars-container')

  root.appendChild(gravatarContainer)

  const container = document.querySelector('.gravatars-container')
  const gravatar = document.createElement('div')
    gravatar.className = 'gravatars'
    container.appendChild(gravatar)

  gravatars(window, gravatar)

  setupListeners(window, gravatar)
}

