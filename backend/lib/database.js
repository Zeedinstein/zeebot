import mongoose from 'mongoose'

mongoose.connect(`mongodb://${process.env.DATABASE_PATH}`, {
  useNewUrlParser: true
})
const database = mongoose.connection

database.on('error', console.error.bind(console, 'connection error:'))
database.once('open', () => {
  console.log('connected')
})

export default database
