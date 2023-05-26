import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { ProductList } from "../Products/ProductList"
import { ProductForm } from "../Products/ProductForm"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>All the candy you could ever dream about!</div>

					<Outlet />
				</>
			} />

			{/* Adding Route Path for the Locations */}
			<Route path="locations" element={<LocationList />} />

			{/* Adding Route Path for the Products */}
			<Route path="products" element={<ProductList />} />
			
			{/* Adding Route Path for the ProductsForm */}
			<Route path="products/ProductForm" element={<ProductForm />} />





		</Routes>
	)
}

