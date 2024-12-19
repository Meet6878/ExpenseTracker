// ExpenseList.jsx
import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-sm md:text-lg font-medium text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm md:text-lg font-medium text-gray-300 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-sm md:text-lg font-medium text-gray-300 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {expenses &&
            expenses &&
            expenses?.length > 0 &&
            expenses?.map((expense) => (
              <tr key={expense._id} className="bg-gray-800 hover:bg-gray-700">
                <td className="px-4 py-2 whitespace-nowrap font-medium text-xs md:text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap font-medium text-xs md:text-sm">
                  ₹{expense.amount}
                </td>
                <td className="px-4 py-2 font-medium text-xs md:text-sm">
                  {expense.description}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
