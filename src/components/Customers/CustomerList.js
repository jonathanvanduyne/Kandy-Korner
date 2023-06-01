import React, { useEffect, useState } from "react";
import { Customer } from "./Customer.js";
import "./Customers.css";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/customers?_expand=user")
            .then((response) => response.json())
            .then((customerArray) => {
                customerArray.sort((a, b) =>
                    a?.user?.name.localeCompare(b?.user?.name)
                );
                setCustomers(customerArray);
            });
    }, []);

    return (
        <>
            <h2>List of customers</h2>

            <article className="customers">
                {customers.map((customer) => (
                    <Customer
                        key={`customer--${customer.id}`}
                        id={customer.id}
                        name={customer?.user?.name}
                        email={customer?.user?.email}
                        loyaltyNumber={customer?.loyaltyNumber}
                    />
                ))}
            </article>
        </>
    );
};
