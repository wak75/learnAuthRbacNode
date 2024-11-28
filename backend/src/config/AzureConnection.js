import {BlobServiceClient} from '@azure/storage-blob';



const connectToBlob = async() =>{
    try{
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING)
        const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME)
        // console.log(containerClient)

        const exist = await containerClient.exists()

        if(!exist){
            throw new Error(`Container ${containerClient} does not exists`)
        }

        console.log(`Connection to ${containerClient} is successful`)

    }catch(error){
        console.log(`Connection to blob failed internal reason: ${error}`)
    }
}


export default connectToBlob

