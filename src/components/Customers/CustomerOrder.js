import { useEffect, useState } from "react"
import "./Customers.css"

export const CustomerOrder = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, updatePurchases] = useState([])
    const [filteredPurchases, updateFilteredPurchases] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser);

    useEffect(() => {
        fetch(`http://localhost:8088/purchases?_expand=customer`)
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8088/productLocations?_expand=product&_embed=productLocation`)
            .then(response => response.json())
            .then((purchasesArray) => {
                updatePurchases(purchasesArray);
            });
    }, []);

    useEffect(() => {
        const findPurchases = purchases.filter((purchase) => {
            return purchase?.customerId === currentUser?.id;
        });
        updateFilteredPurchases(findPurchases);
    }, [purchases]);

    const currentUser = customers.find(customer => customer.userId === kandyUserObject.id)

    return <>
        <h2>Your Orders</h2>
        <ul>
            {
                filteredPurchases.map((purchase) => (
                    <li className="purchase_item" key={`purchase-${purchase.id}`}>
                        <div>
                            <p>Product Name: {purchase?.product?.name}</p>
                        
                        <p>Price: {purchase?.product?.price}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
    </>
}
