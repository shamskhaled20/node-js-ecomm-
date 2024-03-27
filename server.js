const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const DBconnection = require("./config/database");
const categoryRoutes = require("./routes/categoryRoute");
const subCategoryRoutes = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoutes = require('./routes/productRoute');
const UserRoutes = require('./routes/userRoute');
const AuthRoutes = require('./routes/authRoute');
const ApiError = require("./utits/api_error");
const globalError = require('./middleware/errorMiddleware');
// Load environment variables from .env file
dotenv.config({ path: 'config.env' });
// connect with database 
// express
// express
DBconnection();
const app = express();
app.use(express.json()); // <-- Proper usage of express.json() middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode ${process.env.NODE_ENV}`);
}
// mount route 

app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/subcategories",subCategoryRoutes);
app.use("/api/v1/Brands",brandRoute); 
app.use("/api/v1/Products",productRoutes);
app.use("/api/v1/Users",UserRoutes);
app.use("/api/v1/Auth",AuthRoutes);
app.all("*",(err,req,res,next)=>{
    // create error and send it to error handling middleware
    // const err = new Error(`app running on port ${req.orginalUrl}`);
    next(new ApiError(`app running on port ${req.orginalUrl}`,400))
});
// Global Error handling middleware
app.use(globalError);
app.get('/', (req, res) => {
    res.send('our api v4');
});

const port = process.env.PORT; // Use default port 3000 if PORT is not defined in .env

const server =app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

// Events to handle rejections outside express
process.on('unhandledRejection',(err)=>{
        console.error(`UnhandledRejection Errors : ${err.name} | ${err.message} `);
        server.close(()=>{
            console.error('shutting down.....');
            process.exit(1);
        });
});