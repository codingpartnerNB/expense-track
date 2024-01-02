
const ExpenseItem = (props)=>{
    return(
        <tr style={{textAlign: "center", backgroundColor: "rgb(174, 188, 218)"}}>
            <td style={{borderRadius: "8px"}}>{props.category}</td>
            <td style={{borderRadius: "8px"}}>{props.description}</td>
            <td style={{borderRadius: "8px"}}>{props.price}</td>
        </tr>
    );
}

export default ExpenseItem;