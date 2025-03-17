const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect("mongodb+srv://prnv:0PgImDQt2L8dLhob@cluster0.bc9ma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}