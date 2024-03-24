const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ayush1803:ayush1803@cluster0.8xkavbt.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0').then(connected => {
    console.log("Connected");
}).catch(err => {
    console.log(err);
})