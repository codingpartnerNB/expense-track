import styles from './ExpenseItem.module.css';
import edit from '../../assets/edit.png';
import trash from '../../assets/delete.png';
import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/expenseSlice';

const ExpenseItem = (props)=>{
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [formIsShown, setFormIsShown] = useState(false);

    const hideFormHandler = () => {
        setFormIsShown(false);
    };
    const showFormHandler = () => {
        setFormIsShown(true);
    };

    const deleteHandler = async() => {
        const id = props.id;
        const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses${email.replace(/[@.]/g, "")}/${id}.json`;
        try{
            const res = await fetch(url, {
                method: "DELETE",
            });
            if(!res.ok){
                throw new Error("Something went wrong while deleting expense!!");
            }
            console.log("Expense successfully deleted!!");
            dispatch(expenseActions.removeItem(id));
        }catch(error){
            console.log(error);
        }
    }    

    return(
        <React.Fragment>
            {formIsShown && <ExpenseForm expenseId={props.id} onHideForm={hideFormHandler} />}
            <tr className={styles.tr}>
                <td>{props.category}</td>
                <td>{props.description}</td>
                <td>{props.price}</td>
                <td>
                    <div className={styles.action}>
                        <button onClick={showFormHandler}><img src={edit} alt="edit" title="Edit" /></button>
                        <button onClick={deleteHandler}><img src={trash} alt="delete" title="Delete" /></button>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    );
}

export default ExpenseItem;