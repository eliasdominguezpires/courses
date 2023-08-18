const mongoose = require("mongoose");

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Inicio DB");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar la BD");
    }
}


module.exports = {
    dbconnection,
}