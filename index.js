import fs from 'fs'
import { JSDOM } from 'jsdom'

const htmlDir = './html'
const htmlFiles = fs.readdirSync(htmlDir).filter(item => {
    return item.match(/.+\.html$/)
})

const dom = new JSDOM('<body><ul class="list-index"></ul></body>')
const document = dom.window.document
const listIndex = document.querySelector('.list-index')

htmlFiles.forEach(item => {
    const li = document.createElement('li')

    const anchor = document.createElement('a')
    anchor.innerHTML = item
    anchor.setAttribute('href', `./${item}`)
    
    li.appendChild(anchor)
    listIndex.appendChild(li)
})

fs.writeFileSync(`${htmlDir}/index.html`, dom.serialize())