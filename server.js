const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectionString = process.env.MONGO_URL_HOME;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}, (err, goose) => {
    if(err) {
        console.log("ERROR on connection MongoDB")
           console.log(err);
    }
    else {
        console.log("MongoDB connection succeed");

        const server = require("./app");
let PORT = process.env.PORT || 3003;
server.listen(PORT, function (){
    console.log(`The server is running on port: ${PORT}, http://localhost:${PORT}`);
});
}   
});  

