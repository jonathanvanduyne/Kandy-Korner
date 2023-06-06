import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const UpdateLoyaltyNumber = () => {

    const [customer, updateCustomer] = useState({
        id: "",
        loyaltyNumber: "",
        userId: ""
    })

    const navigate = useNavigate()
    const { customerId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/customers?id=${customerId}`)
            .then(response => response.json())
            .then((data) => {
                const customerObject = data[0]
                updateCustomer(customerObject)
            })
    }, [])


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/customers/${customerId}`)
            })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Loyalty Number">Loyalty Number:</label>
                    <input
                        required autoFocus
                        placeholder="New Loyalty # Here"
                        type="number"
                        className="form-control"
                        value={customer.loyaltyNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...customer }
                                copy.loyaltyNumber = evt.target.value
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save New Loyalty Number
            </button>
        </form>
    )
}