const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
})

const ExpenseModel = mongoose.model('Expense',ExpenseSchema);

module.exports = ExpenseModel;