const app = require("./app")

//config file 
const dotenv =require("dotenv");
dotenv.config({path:"backend/config/config.env"})


//connecting database 

const connectDatabase =require("./config/database");
connectDatabase()


//Handling Uncaugh Error

process.on("uncaughtException",err=>{
    console.log(`Error  : ${err.message}`);
    console.log(`Shutting Down the server due to uncaught exception `);
    server.close(()=>{
        process.exit(1);
    });

})

const server = app.listen(process.env.PORT,()=>{

    console.log(`Server is working fine on http//127.0.0.1:${process.env.PORT}`);
})

//handling promise rejection 

process.on("unhandledRejection",err=>{
    console.log(`Error  : ${err.message}`);
    console.log(`Shutting Down the server due to unhandled promise rejection `);
    server.close(()=>{
        process.exit(1);
    });
});

