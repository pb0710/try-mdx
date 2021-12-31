const readline = require('readline')
const fs = require('fs')

function generateCodeblockJsx(dir) {
  return new Promise((resolve, reject) => {
    const mdRead = fs.createReadStream(dir)

    const rl = readline.createInterface({
      input: mdRead
    })

    let content = ''
    let code = ''

    function checkCodeblockStart(line) {
      const startFlags = ['tsx', 'jsx']
      return startFlags.some(flag => line.startsWith(`\`\`\`${flag}`))
    }

    function checkCodeblockEnd(line) {
      return line.startsWith('```')
    }

    rl.on('line', (line) => {
      // console.log(`Received: ${line}`);

      if (checkCodeblockStart(line)) {
        code = '\n'
      } else if (checkCodeblockEnd(line)) {
        line += `\n${code}`
        code = ''
      } else if (code) {
        code += `${line}\n`
      }
      content += `${line}\n`
    })
    rl.on('close', () => {
      // console.log('close')
      const mdWrite = fs.createWriteStream(dir)
      mdWrite.write(content, err => {
        if (err) reject()
        else resolve()
      })
    })
  })
}

async function executeByOrder(tasks = []) {
  for (const task of tasks) {
    await task()
  }
}

function executeByOrder2(tasks = []) {
  const _tasks = tasks.slice()
  const [task] = _tasks.splice(0, 1)
  if (!task) return
  task().then(() => {
    executeByOrder2(_tasks)
  })
}

const tasks = [
  function a() { return generateCodeblockJsx('./mdx/test.mdx') },
  function b() { return generateCodeblockJsx('./mdx/test.mdx') },
  function c() { return generateCodeblockJsx('./mdx/test.mdx') },
  function d() { return generateCodeblockJsx('./mdx/test.mdx') },
  function e() { return generateCodeblockJsx('./mdx/test.mdx') }
]
// executeByOrder(tasks)
executeByOrder2(tasks)
