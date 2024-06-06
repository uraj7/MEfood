const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://piseyuvraj9:xv6dWTNgwGJd5m1C@cluster0.lfltnjh.mongodb.net/mefoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Connected to MongoDB");

        const fetchedData = await mongoose.connection.db.collection("food_items");
        const foodCategory = await mongoose.connection.db.collection("foodCategory");

        
        const data = await fetchedData.find({}).toArray();
        const Catdata = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = Catdata;
        // console.log(global.food_items);//data
    } catch (error) { 
        console.error("Error connecting to MongoDB:", error);
    } 
    
};

module.exports = mongoDB();
