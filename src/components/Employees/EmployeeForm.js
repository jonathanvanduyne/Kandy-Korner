import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const EmployeeForm = () => {

    const [user, updateUser] = useState(
        {
            name: "",
            isStaff: true
        }
    )

    const [employee, updateEmployee] = useState(
        {
            userId: 0,
            locationId: "",
            startDate: 0,
            payRate: 0
        }
    )

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then((newUser) => {
                const newUserCopy = { ...employee }
                newUserCopy.userId = newUser.id
                updateEmployee(newUserCopy)
            })
    }

    useEffect(() => {
        if (employee.userId !== 0) {
            fetch("http://localhost:8088/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/employees")
                });
        }
    }, [employee]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">Add New Employee</h2>

            {/* Update Name in the user json */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of New Employee Here"
                        value={user.name}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.name = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>

            {/* update address in the employee json */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Address">Address:</label>
                    <select
                        className="form-group"
                        value={employee.locationId}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.locationId = parseFloat(evt.target.value)
                                updateEmployee(copy)
                            }
                        }>
                        <option value="">Select a Location address</option>
                        <option value="1">123 N 456 W Government Ave.</option>
                        <option value="2">789 E 123 S Main St.</option>
                        <option value="3">456 W 789 N Elm St.</option>
                    </select>
                </div>
            </fieldset>

            {/* update startDate in the employee json */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Start Date">Hire Date:</label>
                    <input type="date"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>

            {/* update payRate in the employee json */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Pay Rate">Pay Rate:</label>
                    <input type="number"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.payRate = parseFloat(evt.target.value)
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button onClick={(clickEvent) =>
                handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Create New Employee
            </button>
        </form>
    )
}