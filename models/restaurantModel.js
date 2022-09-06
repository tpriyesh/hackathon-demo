var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    name: { type: String },
    address: { type: String },
    lat: { type: String },
    long: { type: String  },
    createdAt: { type: String } ,
    rating: {type: String}
})

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
// const usermoreModel = mongoose.model('usermore', usermoreSchema);

module.exports.getRestaurants = async(data)=> {
    try{
        let usr = new userModel(data)
        return await usr.save()
    }
 catch(e){
    console.log(e);
     return null;
 }
}

module.exports.findUserByEmail = async(email)=> {
    try{
        var data = await userModel.findOne({email })
        return data
    } catch(e){
        return []
    }
}

module.exports.checkEmailPassword = async(email, password)=> {
    try{
        var data = await userModel.findOne({email, password })
        return data
    } catch(e){
        return null;
    }
}

module.exports.listallusers = async()=> {
    try{
        var data = await userModel.find({})
        return data
    }catch(e){
        return []
    }
}

// module.exports.addexperiments = (id, items,callback)=>{
//         usermoreModel.findByIdAndUpdate(id,{$addToSet:{purchaseditems:items}},(error,data)=>{
//             if(error){
//                  callback(error)
//             }
//             else{
//                 callback(data)
//             }
//         })
//     }

// module.exports.listauser = (id)=> {
//     try{
//         return usermoreModel.findOne({userid:id}).populate("userId").populate("userboardid").populate("userclassid").exec()
//     }catch(e){
//         return []
//     }
// }
