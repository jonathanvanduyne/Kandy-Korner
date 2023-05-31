import { useState } from "react"
import { ProductList } from "./ProductList.js"
import { ProductSearch } from "./ProductSearch.js"


export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        <ProductList searchTermState={searchTerms} />
    </>
}