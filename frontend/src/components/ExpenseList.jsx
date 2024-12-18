// ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses }) => {
    return (
        // <table className="min-w-full border-collapse block md:table">
        //     <thead className="block md:table-header-group">
        //         <tr className="border border-grey-500 md:border-none block md:table-row">
        //             <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell">
        //                 Date
        //             </th>
        //             <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell">
        //                 Amount
        //             </th>
        //             <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell">
        //                 Description
        //             </th>
        //         </tr>
        //     </thead>
        //     <tbody className="block md:table-row-group">
        //         {expenses.map((expense) => (
        //             <tr key={expense._id} className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
        //                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        //                     {new Date(expense.date).toLocaleDateString()}
        //                 </td>
        //                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        //                     ₹{expense.amount}
        //                 </td>
        //                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        //                     {expense.description}
        //                 </td>
        //             </tr>
        //         ))}
        //     </tbody>
        
        // </table>
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
            {expenses.map((expense) => (
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
