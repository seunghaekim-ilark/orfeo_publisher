import dayjs from 'dayjs'
import fs from 'fs'
import { JSDOM } from 'jsdom'

function info (name) {
    const path = `${htmlDir}/${name}`
    return fs.statSync(path)
}

const htmlDir = './html'
const htmlFiles = fs.readdirSync(htmlDir).filter(item => {
    return item.match(/.+\.html$/)
}).map(name => {
    return {
        name,
        info: info(name)
    }
})
const template = fs.readFileSync('./template.html')
const dom = new JSDOM(template.toString())

const document = dom.window.document
const table = document.querySelector('.list-index')
const tbody = table.querySelector('tbody')

function td (content) {
    const td = document.createElement('td')
    if (content) {
        td.innerHTML = content
    }
    return td
}

htmlFiles.forEach(item => {
    const tr = document.createElement('tr')
    
    const filename = td()
    const anchor = document.createElement('a')
    anchor.innerHTML = item.name
    anchor.setAttribute('href', `./html/${item.name}`)
    filename.appendChild(anchor)

    const format = 'YYYY/MM/DD hh:mm'

    tr.appendChild(filename)
    tr.appendChild(td( dayjs(item.info.ctime).format(format) ))
    tr.appendChild(td( dayjs(item.info.mtime).format(format) ))
    tr.appendChild(td( dayjs(item.info.birthtime).format(format) ))

    tbody.appendChild(tr)
})

fs.writeFileSync(`./index.html`, dom.serialize())
