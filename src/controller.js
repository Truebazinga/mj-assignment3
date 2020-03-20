const fs = require("fs")

const {
  asyncReadFile,
  asyncWriteFile
} = require('./dao')

exports.getAccount = async (req, res) => {
  const id = req.params.id
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const accounts = JSON.parse(file).filter(v => v.id === Number(id))
  accounts.length == 0 ? res.status(404).send() : res.send(accounts[0])
}

exports.getAllAccounts = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err, data) => {
  if (err) {
    return res.status(500).send()
  }
  res.send(JSON.parse(data))
})

exports.createAccount = async (req, res) => {
  const newAccount = req.body
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const accounts = JSON.parse(file)
  if (accounts.filter(v => v.id === newAccount.id).length != 0) {
    res.status(400).send()
  } else {
    accounts.push(newAccount)
    await asyncWriteFile(JSON.stringify(accounts), req.app.locals.dataFilePath)
    res.status(201).send(accounts)
  }
}

exports.updateAccount = async (req, res) => {
  const put = req.body
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const accounts = JSON.parse(file)
  const candidates = accounts.filter(v => v.id === put.id)
  if (candidates.length === 0) {
    this.createAccount(req, res)
  } else {
    accounts.forEach((value, index, array) => {
      if (value.id === put.id) {
        array[index] = {
          ...value,
          ...put
        }
      }
    })
    await asyncWriteFile(JSON.stringify(accounts), req.app.locals.dataFilePath)
    res.status(200).send()
  }
}

exports.deleteAccount = async (req, res) => {
  const id = req.params.id
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const accounts = JSON.parse(file)
  const newAccounts = accounts.filter(v => v.id !== Number(id))
  if (newAccounts.length === accounts.length) {
    res.status(404).send()
  } else {
    await asyncWriteFile(JSON.stringify(newAccounts), req.app.locals.dataFilePath)
    res.status(204).send()
  }

}
