import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const [product, update] = useState(
        {
            name: "",
            productTypeId: "",
            price: 0,
        }
    )

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: product.name,
            productTypeId: product.productTypeId,
            price: product.price,
        }

        return fetch("http://localhost:8088/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => navigate("/products"))

    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">Add New Product</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Product Here"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <select
                        className="form-group"
                        value={product.productTypeId}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.productTypeId = parseFloat(evt.target.value) 
                                update(copy)
                            }
                        }>
                        <option value="">Select a Product Type</option>
                        <option value="1">Sour Screamers</option>
                        <option value="2">Gummy Gushers</option>
                        <option value="3">Chocolate Chompers</option>
                        <option value="4">Fruity Frizzles</option>
                        <option value="5">Jelly Jammers</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) =>
                handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Submit product
            </button>
        </form>
    )
}