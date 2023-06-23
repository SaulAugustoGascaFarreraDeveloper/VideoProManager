import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

const connection = {}

async function dbConnect()
{
  if(connection.isConnected)
  {
    return;
  }


  const db = await mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: false
  })

  connection.isConnected = db.connections[0].readyState
  console.log(connection.isConnected)
}

export default dbConnect