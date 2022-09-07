var express = require('express')
var router = express.Router()
var restaurantStoryModel = require('../models/restaurantStoryModel');
var AWS = require('aws-sdk');
var fs  = require('fs');

const upload = require("../upload");

const delay = (ms) => {
  return  new  Promise((res, rej) => {
    setTimeout(() => {
      res('Done')
    }, ms);
  })
}


router.post('/', async (req, res) =>{

  await upload(req, res);

  const s3 = new AWS.S3({
    accessKeyId: "AKIA3JZMF3ECCAOBOCLL",
    secretAccessKey: "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",
  })

  console.log("file", req.file);

  //console.log("reqq", req);

  const imagePath = req.file.path
  const blob = fs.readFileSync(imagePath)

  //console.log("image path", req.file.path, req.files[0].originalFilename)

  try {
    const uploadedImage = await s3.upload({
      Bucket: "hackathon-swiggy",
      Key: req.file.originalname,
      Body: blob,
    }).promise()

    console.log("upload iamge", uploadedImage);

    await restaurantStoryModel.createRestaurantStory({
              rId: req.body.rId,
              image: uploadedImage.Location
          })

    
  } catch(e) {
    console.log(e);
    return res.send('error');
  }

  

  return res.send(`file upload`);

    // try {
    //     await upload(req, res);
    //     console.log("body",  req.body, req.files);

    //     await restaurantStoryModel.createRestaurantStory({
    //         rId: req.body.rId,
    //         image: req.file.filename
    //     })
    
    //     // if (req.files.length <= 0) {
    //     //   return res.send(`You must select at least 1 file.`);
    //     // }
    //     await delay(2000);
    //     return res.send(`Files has been uploaded.`);
    //   } catch (error) {
    //     console.log(error);
    
    //     if (error.code === "LIMIT_UNEXPECTED_FILE") {
    //       return res.send("Too many files to upload.");
    //     }
    //     return res.send(`Error when trying upload many files: ${error}`);
    //   }
})

module.exports = router
