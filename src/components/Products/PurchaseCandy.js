import { useEffect, useState } from "react";

export const PurchaseCandy = ({ kandyUserObject, product }) => {

    const [purchase, updatePurchase] = useState({
        customerId: 0,
        locationId: 0,
        productId: 0,
        quantity: 1
    });

    const [locations, setLocations] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [locationInventories, setlocationInventories] = useState([]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // LocationList
    useEffect(() => {
        fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationsArray) => {
                setLocations(locationsArray);
            });
    }, []);

    // CustomerList
    useEffect(() => {
        fetch(`http://localhost:8088/customers?_expand=user`)
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray);
            });
    }, []);

    // LocationInventories
    useEffect(() => {
        fetch(`http://localhost:8088/productLocations?_expand=product`)
            .then(response => response.json())
            .then((productLocationsArray) => {
                setlocationInventories(productLocationsArray);
            });
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const ProductObjectCreation = (product, userParameter) => {
        const chosenInventory = locationInventories.find(locationInventory => locationInventory.productId === product.id);
        const purchaser = customers.find(customer => customer.userId === userParameter.id);
        const copy = { ...purchase };
        copy.customerId = purchaser.id;
        copy.productId = chosenInventory.productId;
        copy.locationId = chosenInventory.locationId;
        updatePurchase(copy);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const PostPurchase = (purchase) => {
        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        })
            .then(response => response.json());
    };

    // if statement to stop a faulty POST
    useEffect(() => {
        if (purchase.customerId !== 0) {
            PostPurchase(purchase);
        }
    }, [purchase]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const PurchaseButtonClick = (product) => {
        if (locationInventories.find(locationInventory => locationInventory?.productId === product?.id)) {
            return <button onClick={() => ProductObjectCreation(product, kandyUserObject)}>Purchase</button>
        } else {
            return "Out of Stock";
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (PurchaseButtonClick(product))

};
