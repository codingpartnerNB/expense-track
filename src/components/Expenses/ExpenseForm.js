import { useState } from "react";
import Modal from "../UI/Modal";
import styles from './ExpenseForm.module.css';

const ExpenseForm = (props)=>{
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("Select Category");
    const priceChangeHandler = (event)=>{
        setPrice(event.target.value);
    }
    const descChangeHandler = (event)=>{
        setDesc(event.target.value);
    }
    const categoryChangeHandler = (event)=>{
        setCategory(event.target.value);
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        const data = {
            id: Math.floor(Math.random()*20),
            price: +price,
            description: desc,
            category: category
        }
        props.expenseData.push(data);
        setPrice("");
        setDesc("");
        setCategory("Select Category");
        props.onHideCart();
    }
    return(
        <Modal onHideCart={props.onHideCart}>
            <section className={styles.main}>
                <div onClick={props.onHideCart} className={styles.close}>X</div>
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
                            <option value="Select Category">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                        </select>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        </Modal>
    );
}

export default ExpenseForm;