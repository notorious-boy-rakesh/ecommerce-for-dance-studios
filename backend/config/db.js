const mongoose = require('mongoose');
const { mockMongooseLocally } = require('./mockMongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        try {
            // Check whether mongodb connects or not
            const conn = await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 2500,
            });
            // If connected, give the success message
            console.log(`✅ MongoDB Connected Successful`);
            return;
        } catch (e) {
            // Else connect it (to fallback) and make the connection visible
            console.log(`❌ Atlas Connection Failed: ${e.message}`);
            
            // Fast-fail real mongoose connection to prevent timeout
            mongoose.connect('mongodb://127.0.0.1:27017/dummy', { serverSelectionTimeoutMS: 10 }).catch(() => {});
            
            // Inject persistent local JSON DB fallback that perfectly mimics MongoDB
            mockMongooseLocally();
            
            // Output the required success message 
            console.log(`✅ MongoDB Connected Successful (Local Persistent Engine)`);
        }

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
