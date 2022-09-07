var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var restaurantStorySchema = new Schema({
    rId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant"},
    image: { type: String }
})

const restaurantStoryModel = mongoose.model('restaurantstory', restaurantStorySchema);
// const usermoreModel = mongoose.model('usermore', usermoreSchema);

module.exports.getAllStoriesForARestaurant = async(rId)=> {
    try{
       const list = await restaurantStoryModel.find({rId});
       console.log('list', list);
       return list;
    }
 catch(e){
    console.log(e);
     return [];
 }
}

module.exports.createRestaurantStory = async(data)=> {
    try{
        let res = new restaurantStoryModel(data)
        return await res.save()
    }
 catch(e){
    console.log(e);
     return null;
 }
}