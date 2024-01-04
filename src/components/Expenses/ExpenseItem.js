import styles from './ExpenseItem.module.css';
import edit from '../../assets/edit.png';
import trash from '../../assets/delete.png';
import { useContext, useState } from 'react';
import ExpenseContext from '../../store/expense-context';
import ExpenseForm from './ExpenseForm';

const ExpenseItem = (props)=>{
    const expenseCtx = useContext(ExpenseContext);
    const [formIsShown, setFormIsShown] = useState(false);

    const hideFormHandler = () => {
        setFormIsShown(false);
    };
    const showFormHandler = () => {
        setFormIsShown(true);
    };

    const deleteHandler = async() => {
        expenseCtx.removeItem(props.id);
    }    

    return(
        <tr className={styles.tr}>
            {formIsShown && <ExpenseForm expenseId={props.id} onHideForm={hideFormHandler} />}
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
    );
}

export default ExpenseItem;