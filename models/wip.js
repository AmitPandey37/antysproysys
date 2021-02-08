var mongoose = require('mongoose');


var wipSchema = new mongoose.Schema({
    Specs1:String,
    Specs2:String,
    Specs3:String,
    Price:Number,
    Remarks:String,
    FirstAntsContact:String,
    ContactNumber:Number,
    CustomerEmail:String,
    CompanyBranch:String,
    InformDate:String,
    DispatchDate:String,
    POdate:String,
    order_id:Number,
    InstituteOrCompany:String,
    CustomerCategory:String,
    Contactperson:String,
    Department:String,
    Item:String,

})

module.exports = mongoose.model("WIP",wipSchema)