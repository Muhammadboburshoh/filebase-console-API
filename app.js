const fs = require("fs")
const util = require("util")
const path = require("path")

const filePath = path.join(__dirname, "src", "documents")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)


;( async () => {

  const booksPath = path.join(filePath, "books.json")
  const booksContent = await read(booksPath, "utf8")
  const books = JSON.parse(booksContent)

  const usersPath = path.join(filePath, "users.json")
  const usersContent = await read(usersPath, "utf8")
  const users = JSON.parse(usersContent)

  if (process.argv[2] === "--get") {

    if(process.argv[3] === "books") {
      console.log(books);
    } else if(process.argv[3] === "users") {
      console.log(users);
    }
  } else if(process.argv[2] === "--post") {

    if(process.argv[3] === "users") {

      const newArr = {
        id : users[users.length - 1].id + 1,
        username: process.argv[4],
        password: process.argv[5]
      }

      users.push(newArr)

      await write(usersPath, JSON.stringify(users, null, 2))
      console.log(newArr);
    } else if(process.argv[3] === "books") {

      const newArr = {
        id : books[books.length - 1].id + 1,
        bookname: process.argv[4],
      }

      books.push(newArr)

      await write(booksPath, JSON.stringify(books, null, 2))
      console.log(newArr);
    }
  } else if (process.argv[2] === "--delete") {
// console.log(process.argv[3]);
    if(process.argv[3] === "books") {

      const deleteBook = books.findIndex(book => book.id == process.argv[4])

      if(deleteBook !== 0 && deleteBook > -1) {
        const book = books[deleteBook]
        books.splice(deleteBook, 1)

        await write(booksPath, JSON.stringify(books, null, 2))
        console.log(book);
      } else {
        console.log("Bunday idli book topilmadi");
      }
    } else if(process.argv[3] === "users") {

      const deleteUser = users.findIndex(user => {
        return user.id == process.argv[4]
      })

      if(deleteUser !== 0 && deleteUser > -1) {
        const user = users[deleteUser]
        users.splice(deleteUser, 1)

        await write(usersPath, JSON.stringify(users, null, 2))
        console.log(user);
      } else {
        console.log("Bunday idli user topilmadi");
      }
    }
  }

})()