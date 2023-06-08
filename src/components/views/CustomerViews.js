import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList.js"
import { ProductContainer } from "../Products/ProductContainer.js"
import { CustomerOrder } from "../Customers/CustomerOrder.js"

export const CustomerViews = () => {
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

			<Route path="products" element={<ProductContainer />} />
			
			<Route path="orders" element={<CustomerOrder />} />

		</Routes>
	)
}