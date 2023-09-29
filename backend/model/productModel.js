const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 character"]
    },
    price: {
        type: Number,
        // required: true,
        default: 0.0,
    },
    description:{
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true,
            }
        }
    ],
    catagory: {
        type: String,
        required:[true,"Please enter product catagory"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phone',
                'Laptops',
                'Accesories',
                'Headphone',
                'Foods',
                'Books',
                'Cloths/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: "Please select correct catagory"
        }
        
    },
    seller: {
        type:String,
        required:[true,"Please enter seller"],
    },
    stock: {
        type: Number,
        required:[true,"Please enter product stock"],
        validate: {
            validator: function(value){
                return value <= 20;
            },
            message: 'Product stock cannot exceeds 20'
        }
    },
    numOfReviews:{
        type: Number,
        default:0,
    },
    reviews:[
        {
        name: {
            type: String,
            required:true
        },
        rating: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }
        }
    ],
    createdAt :{
        type: String,
        default: Date.now()
    }
})

let schema=mongoose.model('Product', productSchema)

module.exports=schema;