import { defineClientAppEnhance } from '@vuepress/client'
const loadScript = (url, onload) => {
  const doc = document
  const head = doc.head || (doc.getElementsByTagName('head')[0] || doc.documentElement)
  const node = doc.createElement('script')

  node.src = url
  node.async = true
  node.onload = onload
  node.onerror = () => {}
  head.appendChild(node)
}

export default defineClientAppEnhance(() => {
  console.log(document.querySelector('div'))
})