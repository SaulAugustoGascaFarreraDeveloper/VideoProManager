import dbConnect from "../../db/dbconnection"
import Video from "../../db/model/VideoModel"

dbConnect()

const handler = async (req,res) => 
{
    // const client = await connectDB()
    // const db = client.db("DirectrackCM_DB")

    const {method} = req
   

    switch(method)
    {
        case "GET":
            // let bodyObject = JSON.parse(req.body)
            // let myPost = await db.collection("clientes").insertOne(bodyObject)
            // res.json(myPost.ops[0])
            // break;
            const videos = await Video.find({})
            res.status(200).json({success: true,data:videos})
            break
        case "POST":
            const video = await Video.create(req.body)
            res.status(201).json({success: true,data:video})
            break
       
        default:
            res.status(400).json({success:false})
            break
    }


    //res.json({test:"test"})

}

export default handler