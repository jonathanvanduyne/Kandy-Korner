import { useEffect, useState } from "react";
import "./Employee.css";
import { useNavigate } from "react-router-dom";
import { FireEmployee } from "./FireEmployee.js";



export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    const fetchEmployees = () => {
    fetch("http://localhost:8088/employees?_expand=user&_expand=location")
        .then((response) => response.json())
        .then((employeeArray) => {
            setEmployees(employeeArray);
        });
};

    useEffect(() => {
        fetchEmployees(setEmployees);
    }, []);

    const handleAddEmployeeClick = () => {
        navigate("./NewEmployeeForm");
    };

    return (
        <>
            <h2>List of Employees</h2>

            <button onClick={handleAddEmployeeClick}>Add New Employee</button>

            <article className="employees">
                {employees.map((employee) => (
                    <section className="employee" key={`employee--${employee.id}`}>
                        <header>Name: {employee?.user?.name}</header>
                        <p>Location: {employee?.location?.address}</p>
                        <p>Start Date: {employee?.startDate}</p>
                        <p>Pay Rate: {employee?.payRate}/hr</p>
                        <footer>
                            <FireEmployee id={employee.id} userId={employee.userId} fetchEmployees={fetchEmployees}/>
                        </footer>
                    </section>
                ))}
            </article>
        </>
    );
};
