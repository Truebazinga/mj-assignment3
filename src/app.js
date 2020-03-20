const express = require('express')
const {
  getAccount,
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount
} = require('./controller')

const app = express()
app.locals.dataFilePath = "./data.json"

const port = 3000

app.use(express.json())
app.get('/', (req, res) => res.send('<h1>Hi, Welcome!</h1>'))

app.get("/api/tasks/:id", getAccount)
app.get("/api/tasks", getAllAccounts)

app.post("/api/tasks", createAccount)

app.put("/api/tasks", updateAccount)

app.delete("/api/tasks/:id", deleteAccount)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

exports.app = app
