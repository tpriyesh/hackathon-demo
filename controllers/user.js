var express = require('express')
var router = express.Router()
var usermodel = require('../models/userModel')

const getUserRole  =  (role)  => {
    if  (role === "0")  {
        return 'RESTAURANT OWNER'
    } else  if (role === "1") {
        return 'CONSUMER'
    } else {
        return "CONSUMER";
    }
}

router.get('/listauser/:userid', async(req, res) =>{  
    var result = await usermodel.listauser(req.params.userid)
        if(result == null){
            res.status(400)
            res.json({ error: 'No data!', error_description: "User data not available!" })
            return
        }
        res.json(result)

})

router.post('/register', async (req, res) =>{

    let data ={}
        data.name = req.body.name
        data.email = req.body.email
        data.password = req.body.password
        data.role = getUserRole(req.body.role);
        data.createdDate = new Date().getTime()

        const user = await usermodel.register(data);

        if (!user) {
            res.json({ error: 'Register failed', data: null })
            return;
        }

        return res.json({ data: 'User registered', error: null})
})


router.get('/listallusers', async (req, res) =>{
    var result = await usermodel.listallusers()
        if(result.length == 0){
            res.status(400)
            res.json({ error: 'No data!', error_description: "User data not available!" })
            return
        }
        res.json(result)
})

router.get('/validuser', async (req, res) =>{
    const { email, password }  = req.body;
    var result = await usermodel.checkEmailPassword(email,  password)
        if(!result){
            res.status(401)
            res.json({ error: 'Invalid user', data:  null })
            return;
        }
        res.json(result)
})


module.exports = router