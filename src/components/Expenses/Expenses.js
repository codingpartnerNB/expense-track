import ExpenseItem from './ExpenseItem';
import styles from './Expenses.module.css';

const Expenses = (props)=>{
    const item = props.expenseData.map(item=><ExpenseItem category={item.category} description={item.description} price={item.price} />);
    return(
        <section>
            <div className={styles.actions}>
                <button onClick={props.onShowCart}>Add Expense</button>
            </div>
            <div>
                <table>
                    <thead>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {item}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Expenses;