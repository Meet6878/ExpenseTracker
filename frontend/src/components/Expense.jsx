import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
// import ExpenseForm from "./ExpenseForm";
// import ExpenseList from "./ExpenseList";
// import MonthlyOverview from "./MonthlyOverview";

const ExpenseForm = lazy(() => import("./ExpenseForm"));
const ExpenseList = lazy(() => import("./ExpenseList"));
const MonthlyOverview = lazy(() => import("./MonthlyOverview"));
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/v1/get`);
      setExpenses(res.data);
      calculateTotal(res.data);
    } catch (error) {
      setError("Failed to fetch expenses.");
      toast.error("Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (formData) => {
    const { date, amount, description } = formData;

    if (!date || !amount || !description) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/create`,
        { date, amount, description },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data?.success) {
        const newExpense = res.data?.newExpense;
        const updatedExpenses = [...expenses, newExpense];

        setExpenses(updatedExpenses);
        calculateTotal(updatedExpenses);
        toast.success("Expense added successfully!");
      } else {
        setError("Failed to add expense.");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add expense.");
      setError("Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (expenses) => {
    const total = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    setTotalAmount(total);
  };

  useEffect(() => {
    // getUser();
    fetchExpenses();
  }, []);

  return (
    <div className="container mx-auto p-4 h-auto max-w-full bg-gray-800 text-white">
    <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>
    {error && <div className="text-red-500 mb-4">{error}</div>}
    <Suspense
      fallback={
        <div className="h-screen w-full bg-gray-900 flex justify-center items-center">
          <div className="relative w-48 h-16">
            <div className="absolute w-5 h-5 rounded-full bg-white left-1/6 animate-bounce delay-0"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white left-2/5 animate-bounce delay-200"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white right-1/6 animate-bounce delay-400"></div>

            <div className="absolute w-5 h-1 rounded-full bg-black opacity-90 left-1/6 top-16 blur-sm animate-pulse delay-0"></div>
            <div className="absolute w-5 h-1 rounded-full bg-black opacity-90 left-2/5 top-16 blur-sm animate-pulse delay-200"></div>
            <div className="absolute w-5 h-1 rounded-full bg-black opacity-90 right-1/6 top-16 blur-sm animate-pulse delay-400"></div>
          </div>
        </div>
      }
    >
      <ExpenseForm addExpense={addExpense} />
      {loading ? (
        <div className="h-screen w-full bg-gray-900 flex justify-center items-center">
          <div className="relative w-48 h-16">
            <div className="absolute w-5 h-5 rounded-full bg-white left-1/6 animate-bounce delay-0"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white left-2/5 animate-bounce delay-200"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white right-1/6 animate-bounce delay-400"></div>

            <div className="absolute w-5 h-1 rounded-full bg-black opacity-90 left-1/6 top-16 blur-sm animate-pulse delay-0"></div>
            <div className="absolute w-5 h-1 rounded-full bg-black opacity-90 left-2/5 top-16 blur-sm animate-pulse delay-200"></div>
            <div className="absolute w-5 h-1 rounded-full bg-black opacity-90 right-1/6 top-16 blur-sm animate-pulse delay-400"></div>
          </div>
        </div>
      ) : (
        <>
          <ExpenseList expenses={expenses} />
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">
              Total Amount: ₹ {totalAmount}
            </h2>
          </div>
          <MonthlyOverview expenses={expenses} />
        </>
      )}
    </Suspense>
    <ToastContainer />
  </div>
  );
};

export default Expense;
