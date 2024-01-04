import { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import styles from './ExpenseForm.module.css';
import ExpenseContext from "../../store/expense-context";
import AuthContext from "../../store/auth-context";

const ExpenseForm = (props)=>{
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const authCtx = useContext(AuthContext);
    const email = authCtx.email;
    const expenseCtx = useContext(ExpenseContext);
    const expenseId = props.expenseId;
    const priceChangeHandler = (event)=>{
        setPrice(event.target.value);
    }
    const descChangeHandler = (event)=>{
        setDesc(event.target.value);
    }
    const categoryChangeHandler = (event)=>{
        setCategory(event.target.value);
    }

    const fetchHandler = async()=>{
        const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses${email.replace(/[@.]/g,"")}/${expenseId}.json`;
        try{
            const res = await fetch(url);
            if(!res.ok){
                throw new Error("Something went wrong while fetching expenses!");
            }
            const resdata = await res.json(); 
            setPrice(resdata.price);
            setCategory(resdata.category);
            setDesc(resdata.description);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(expenseId){
            fetchHandler();
        }
    },[expenseId]);
    
    const submitHandler = async(event)=>{
        event.preventDefault();
        const data = {
            price: +price,
            description: desc,
            category: category
        }
        if(expenseId){
            expenseCtx.editItem(data, expenseId);
        }else{
            expenseCtx.addItem(data);
        }
        setPrice("");
        setDesc("");
        setCategory("Select Category");
        props.onHideForm();
    }
    return(
        <Modal onHideForm={props.onHideForm}>
            <section className={styles.main}>
                <div onClick={props.onHideForm} className={styles.close}>X</div>
                <h1>Add Your Expenses</h1>
                <form onSubmit={submitHandler}>
                    <div className={styles.control}>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" value={price} onChange={priceChangeHandler} required />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" value={desc} onChange={descChangeHandler} required />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="category">Category</label>
                        <select value={category} id="category" onChange={categoryChangeHandler}>
                            <option>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                        </select>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">{expenseId ? "Save" : "Submit"}</button>
                    </div>
                </form>
            </section>
        </Modal>
    );
}

export default ExpenseForm;