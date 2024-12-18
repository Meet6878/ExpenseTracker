const ExpenseModel = require("../model/ExpenseModel");

const CreateExpenseController = async(req,res)=>{

    const { date, amount, description } = req.body;
    try {
        
        const newExpense = new ExpenseModel({ date, amount, description });
        await newExpense.save();
        res.status(201).send({
            success: true,
            message: 'Expense created successfully',
            newExpense,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

}

const GetExpenseController = async(req,res)=>{
    try {
        const expenses = await ExpenseModel.find();
        res.status(200).json(expenses);
    } catch (error) {
        console.log("error",error);
        
    }
    }
    
    const DeleteExpenseController = async(req,res)=>{
        try {
            const result = await ExpenseModel.deleteMany({});
            res.status(200).json(result);
        } catch (error) {
            console.error("Error deleting expenses:", error);
            res.status(500).json({ message: "Failed to delete expenses", error });
            
        }
        }
    
    
module.exports = {CreateExpenseController, GetExpenseController,DeleteExpenseController};