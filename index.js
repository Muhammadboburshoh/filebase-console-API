const fs = require("fs")
const util = require("util")
const path = require("path")

const scan = util.promisify(fs.readdir)
const read = util.promisify(fs.readFile)
const statustic = util.promisify(fs.stat)

const filePath = path.join(__dirname, "src", "documents")

const query = process.argv[2] || ""



;(async () => {

  const files = await scan(filePath)

  console.log(files);

  let findFile = []

  for (let file of files) {

    const checker = await statustic(file)

    if (checker.isFile() && file !== path.basename(process.argv[1])) {

      const sourse = await read(file, "utf8")

      if (sourse.match(new RegExp(query, "i"))) {
        findFile.push(file)
      }
    }
  }

  if (findFile.length) {
    console.log(findFile, "bor");
  } else {
    console.log("Bunday file topilmadi");
  }
})()