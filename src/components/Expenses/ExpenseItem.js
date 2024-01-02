
const ExpenseItem = (props)=>{
    return(
        <tr>
            <td>{props.category}</td>
            <td>{props.description}</td>
            <td>{props.price}</td>
        </tr>
    );
}

export default ExpenseItem;