import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList.js"
import { ProductList } from "../Products/ProductList.js"
import { ProductForm } from "../Products/ProductForm.js"
import { EmployeeList } from "../Employees/EmployeeList.js"
import { EmployeeForm } from "../Employees/EmployeeForm.js"
import { CustomerList } from "../Customers/CustomerList.js"
import { CustomerDetails } from "../Customers/CustomerDetails.js"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>All the candy you could ever dream about!</div>

					<Outlet />
				</>
			} />

			<Route path="locations" element={<LocationList />} />

			<Route path="products" element={<ProductList />} />
			
			<Route path="products/ProductForm" element={<ProductForm />} />
			
			<Route path="employees" element={<EmployeeList />} />

			<Route path="employees/NewEmployeeForm" element={<EmployeeForm />} />
			
			<Route path="customers" element={<CustomerList />} />
			
			<Route path="customers/:customerId" element={<CustomerDetails />} />





		</Routes>
	)
}