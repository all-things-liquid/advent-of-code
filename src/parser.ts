//import axios from 'axios'
import parse from 'node-html-parser'
import { readFileSync, writeFileSync } from 'fs'

//const BASE_URL = 'https://adventofcode.com'
export async function getInstructions(day: number, year: number) {
  console.log(day + year)
  //const { data } = await axios.get(`${BASE_URL}/${year}/day/${day}`)
  const data = readFileSync('./src/test.html', 'utf-8')
  const html = parse(data)

  const node = html.querySelector('.day-desc')
  writeFileSync(
    './tmp.txt',
    node?.childNodes[0].childNodes.reduce(
      (file, n) =>
        file.concat(`${n.nodeType}  ${n.text} ${n.childNodes.length}\n`),
      `${node?.childNodes[0].nodeType}\n`
    ) ?? ''
  )

  /* TODO: recursive parser!
     Declare variables for class names
     Stop condition : childNodes is an empty array
     Then for each text, check the node type (1 - special, 3 - text)
       1. case special
         a. if special is an int, surround with ``
         b. else special is text, surround with ** **
       2. case text
         a. if text if surrounded with <code></code>, replace them with ```\n ```\n
         b. else append text as is
         c. first one will always be the title, append # and a space
   */
}
