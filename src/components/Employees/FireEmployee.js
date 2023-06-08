export const FireEmployee = ({ id, userId, fetchEmployees }) => {

        const deleteEmployee = (event, id, userId) => {
            event.preventDefault()

            fetch(`http://localhost:8088/employees/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    fetch(`http://localhost:8088/users/${userId}`, {
                        method: "DELETE"
                    });
                })
                .then(() => {
                    console.log("Employee and User deleted successfully.");
                })
                .then(() => {
                    fetchEmployees()
                })
        };

        return <button className="fireEmployeeButton" onClick={(event) => deleteEmployee(event, id, userId)}>Fire Employee</button>


    }
