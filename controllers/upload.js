var express = require('express')
var router = express.Router()

const upload = require("../upload");

const delay = (ms) => {
  return  new  Promise((res, rej) => {
    setTimeout(() => {
      res('Done')
    }, ms);
  })
}


router.post('/', async (req, res) =>{

    try {
        await upload(req, res);
        console.log(req.files);
    
        // if (req.files.length <= 0) {
        //   return res.send(`You must select at least 1 file.`);
        // }
        await delay(2000);
        return res.send(`Files has been uploaded.`);
      } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
      }
})

module.exports = router
