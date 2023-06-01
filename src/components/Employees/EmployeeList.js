import { useEffect, useState } from "react"
import "./Employee.css"
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
                .then(response => response.json())
                .then((employeeArray) => {
                    employeeArray.sort((a, b) => a?.user?.name.localeCompare(b?.user?.name));
                    setEmployees(employeeArray);
                })
        },
        []
    )

    const handleAddEmployeeClick = () => {
        navigate("./NewEmployeeForm")
    }
    return( <> 
        <h2>List of Employees</h2>

        <button onClick={handleAddEmployeeClick}>Add New Employee</button>

        <article className="employees">
            {
                employees.map(
                    (employee) => {
                        return <section className="employee" key={`employee--${employee.id}`}>
                            <header>Name: {employee?.user?.name}</header>
                            <p>Location: {employee?.location?.address}</p>
                            <p>Start Date: {employee?.startDate}</p>
                            <p>Pay Rate: {employee?.payRate}/hr</p>
                        </section>
                    }
                )
            }
        </article>
    </>
)}