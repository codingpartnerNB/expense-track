import { Link } from "react-router-dom";

const Home = ()=>{
    return(
        <header style={{display : "flex", justifyContent: "space-between"}}>
            <h1>
                Welcome to Expense Tracker!!!
            </h1>
            <p>Your profile is Incomplete. <Link to="/update">Complete now</Link></p>
            <hr />
        </header>
    );
}

export default Home;