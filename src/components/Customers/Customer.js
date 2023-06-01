import { Link } from "react-router-dom"

export const Customer = ({ id, name, email, loyaltyNumber }) => {
    return <section className="employee">
        <div>
            <Link to={`/customers/${id}`}>Name: {name}</Link>
        </div>
        <div>Email: {email}</div>
        <div>Loyalty Number: {loyaltyNumber}</div>
    </section>
}