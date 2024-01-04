// import { useCallback, useContext, useEffect, useState } from "react";
import { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./Expenses.module.css";
// import AuthContext from "../../store/auth-context";
import ExpenseContext from "../../store/expense-context";
import ExpenseForm from "./ExpenseForm";

const Expenses = (props) => {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  // const [expenses, setExpenses] = useState([]);
  // const email = authCtx.email;
  const expenseCtx = useContext(ExpenseContext);
  const [formIsShown, setFormIsShown] = useState(false);
  const { items } = expenseCtx;

  //Without useContext

  // const fetchHandler = useCallback(async()=>{
  //   const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses${email.replace(/[@.]/g,"")}.json`;
  //   try{
  //     const res = await fetch(url);
  //     if(!res.ok){
  //       throw new Error("Something went wrong while fetching expenses!");
  //     }
  //     const data = await res.json();
  //     const loadedExpenses = [];
  //     for(const key in data){
  //       loadedExpenses.push({
  //         id: key,
  //         category: data[key].category,
  //         description: data[key].description,
  //         price: data[key].price
  //       })
  //     }
  //     setExpenses(loadedExpenses);
  //   }catch(error){
  //     console.log(error);
  //   }
  // },[]);
  // useEffect(()=>{
  //   if(isLoggedIn){
  //     fetchHandler();
  //   }
  // },[isLoggedIn]);

  const hideFormHandler = () => {
    setFormIsShown(false);
  };
  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const item = items && items.length > 0 ? (
        items.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            category={item.category}
            description={item.description}
            price={item.price}
          />
        ))
      ) : (
      <tr className={styles.tr}>
        <td colSpan="4">No Expenses Here</td>
      </tr>
    );

  return (
    <section>
      {formIsShown && <ExpenseForm expenseId={null} onHideForm={hideFormHandler} />}
      <div className={styles.actions}>
        <button onClick={showFormHandler}>Add Expense</button>
      </div>
        <table className={styles.container}>
          <thead>
            <tr key="head">
              <th>Category<hr/></th>
              <th>Description<hr/></th>
              <th>Price<hr/></th>
              <th>Actions<hr/></th>
            </tr>
          </thead>
          <tbody>{item}</tbody>
        </table>
    </section>
  );
};

export default Expenses;
