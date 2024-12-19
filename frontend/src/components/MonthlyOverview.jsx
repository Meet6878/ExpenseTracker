// MonthlyOverview.jsx


const MonthlyOverview = ({ expenses }) => {
    const calculateMonthlyExpenses = () => {
        const monthlyExpenses = {};

        expenses && expenses?.forEach(expense => {
            const date = new Date(expense.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!monthlyExpenses[key]) {
                monthlyExpenses[key] = 0;
            }

            monthlyExpenses[key] += parseFloat(expense.amount);
        });

        return monthlyExpenses;
    };

    const monthlyExpenses = calculateMonthlyExpenses();

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">Monthly Overview</h2>
            <ul>
                {Object.entries(monthlyExpenses).map(([month, total]) => (
                    <li key={month} className="mt-2">
                        <span className="font-semibold">{month}:</span> ₹{total.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MonthlyOverview;
