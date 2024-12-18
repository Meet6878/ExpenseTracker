// ExpenseForm.jsx
import { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
    const [formData, setFormData] = useState({ date: '', amount: '', description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense(formData);
        setFormData({ date: '', amount: '', description: '' });
    };

    return (
        <div className="mb-6 p-4 bg-white shadow-md rounded-lg max-w-xl mx-auto">
        <h2 className="text-xl text-gray-700 font-semibold text-center mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col text-black sm:flex-row sm:space-x-4">
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3"
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                    className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Add Expense
            </button>
        </form>
    </div>
    );
};

export default ExpenseForm;
