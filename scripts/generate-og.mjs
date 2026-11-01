import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = resolve(root, 'public/opengraph-image.svg')
const pngPath = resolve(root, 'public/opengraph-image.png')
const twitterPath = resolve(root, 'public/twitter-image.png')

const svg = readFileSync(svgPath)
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
})
const png = resvg.render().asPng()
writeFileSync(pngPath, png)
copyFileSync(pngPath, twitterPath)
console.log(`Wrote ${pngPath} and ${twitterPath}`)
