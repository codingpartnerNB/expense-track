import { useCallback, useContext, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./Expenses.module.css";
import AuthContext from "../../store/auth-context";

const Expenses = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [expenses, setExpenses] = useState([]);

  const fetchHandler = useCallback(async()=>{
    const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses.json`;
    try{
      const res = await fetch(url);
      if(!res.ok){
        throw new Error("Something went wrong while fetching expenses!");
      }
      const data = await res.json();
      const loadedExpenses = [];
      for(const key in data){
        loadedExpenses.push({
          id: key,
          category: data[key].category,
          description: data[key].description,
          price: data[key].price
        })
      }
      setExpenses(loadedExpenses);
    }catch(error){
      console.log(error);
    }
  },[]);
  useEffect(()=>{
    if(isLoggedIn){
      fetchHandler();
    }
  },[isLoggedIn]);
  const item =
    expenses && expenses.length > 0 ? (
      expenses.map((item) => (
        <ExpenseItem
          key={item.id}
          category={item.category}
          description={item.description}
          price={item.price}
        />
      ))
    ) : (
      <tr>
        <td colSpan="3">No Expenses Here</td>
      </tr>
    );
  return (
    <section>
      <div className={styles.actions}>
        <button onClick={props.onShowCart}>Add Expense</button>
      </div>
        <table className={styles.container}>
          <thead>
            <th>Category<hr/></th>
            <th>Description<hr/></th>
            <th>Price<hr/></th>
          </thead>
          <tbody>{item}</tbody>
        </table>
    </section>
  );
};

export default Expenses;
