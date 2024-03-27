const mongoose = require('mongoose');

const DBconnection = () => {
    mongoose.connect(process.env.DB_Url).then((conn)=>{
        console.log('Database Connected ')
    })
    // .catch((err)=>{
    //     console.log(`error : ${err}`);
    //     process.exit();
    // })
    ;
};
module.exports = DBconnection;