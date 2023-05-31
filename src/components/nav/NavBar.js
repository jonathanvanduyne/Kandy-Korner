import "./NavBar.css"
import { EmployeeNavBar } from "./EmployeeNav.js"
import { CustomerNavBar } from "./CustomerNav.js"

export const NavBar = () => {

        const localKandyUser = localStorage.getItem("kandy_user")
        const kandyUserObject = JSON.parse(localKandyUser)
    
    
        if (kandyUserObject.isStaff) {
            return <EmployeeNavBar />
        }
        else {
            return <CustomerNavBar />
        }
    }

