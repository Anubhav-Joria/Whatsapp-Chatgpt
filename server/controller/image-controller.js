import grid from "gridfs-stream";
import mongoose from "mongoose";

// URL for serving files, assuming a local server
const url = "http://localhost:8000";

// Initializing GridFS and related components
let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  // Creating a GridFSBucket instance
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",  // Using 'fs' as the bucket name
  });

  // Creating a Grid instance for working with GridFS
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

// Handling the upload of an image
export const uploadImage = (request, response) => {

  // Checking if a file was provided in the request
  if (!request.file) return response.status(404).json("File not found");

   // Constructing the image URL based on the file's filename
  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json(imageUrl);
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    // const readStream = gfs.createReadStream(file.filename);
    // readStream.pipe(response);
    const readStream = gridfsBucket.openDownloadStream(file._id);

    // Piping the read stream to the response stream to send the image content
    readStream.pipe(response);
  } catch (error) {
    // Handling errors that occur during the retrieval process
    response.status(500).json({ msg: error.message });
  }
};
