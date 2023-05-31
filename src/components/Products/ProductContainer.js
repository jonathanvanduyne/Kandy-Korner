import { useState } from "react"
import { ProductList } from "./ProductList.js"
import { ProductSearch } from "./ProductSearch.js"


export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <h2>List of Products</h2>

        <ProductSearch setterFunction={setSearchTerms} />
        <ProductList searchTermState={searchTerms} />
    </>
}