const mongoose = require('mongoose');

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
            console.log(`❌ Atlas Connection Failed: ${e.message}`);
            // Strict mode: no local fallback allowed. Fail if MongoDB doesn't connect.
            throw e;
        }

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
