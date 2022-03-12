import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connect from './db/connect.js'
import {workModel} from './model/workModel.js'

const start = async () => {
  try {
    await connect(process.env.MONGO_URL)
    await workModel.deleteMany()
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))  //for es6 module we go for the meta.url
    )
    await workModel.create(jsonProducts)
    console.log('Success!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()