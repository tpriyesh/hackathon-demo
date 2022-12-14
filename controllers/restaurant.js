var express = require('express')
var router = express.Router()
var restaurantModel = require('../models/restaurantModel');
var restaurantStoryModel = require('../models/restaurantStoryModel');

router.post('/create', async (req, res) =>{

    let data ={}
        data.user = req.body.user
        data.name = req.body.name
        data.address = req.body.address
        data.rating = req.body.address;
        data.lat =req.body.lat;
        data.long = req.body.long;
        data.createdDate = new Date().getTime()
        data.meals = req.body.meals;

        const rest = await restaurantModel.createRestaurant(data);

        if (!rest) {
            res.json({ error: 'Register failed', data: null })
            return;
        }

        return res.json({ data: 'Restaurant registered', error: null})
})

router.get('/info', async (req, res) =>{
      
    //console.log("req", req);

        const rest = await restaurantModel.getRestaurantDetail(req.query.userId);

        if (!rest) {
            res.json({ error: 'Restaurant Not exist', data: null })
            return;
        }

        const list = await restaurantStoryModel.getAllStoriesForARestaurant(rest._id);
        const storyList = list.map(item => ({
            storyId: item._id,
            storyUrl: item.image
        }))
        console.log('story', storyList);
        const detail = {...rest, storyList};
        console.log('rest', rest);
        return res.json({ data: detail, error: null})
})

router.get('/list', async (req, res) =>{
      
    //console.log("req", req);

        const rest = await restaurantModel.list();

        if (!rest) {
            res.json({ error: 'Restaurant Not exist', data: null })
            return;
        }

        const list = await restaurantStoryModel.getAllStories();

        console.log("list" , list);

        const items = rest.map(item => {
            const s =[];
            list.forEach(k => {
                console.log("k is", k.rId, item._id);
                if (k.rId.toString() === item._id.toString()) {
                    console.log("ush called")
                    s.push(k);
                }
            })
            return {
                ...item,
                storyList: s
            }
        })

        
        return res.json({ data: items, error: null})
})


module.exports = router