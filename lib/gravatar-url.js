import md5 from 'js-md5'

export function emailFunc(){
  return Math.random().toString(36).substring(7) + '@gmail.com'
}

export default function gravatarUrl (size) {
  const email = emailFunc()
  return `http://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=${size}`
}
