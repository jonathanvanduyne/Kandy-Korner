import { useEffect, useState } from "react"
import "./ProductList.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [price, filterPrice] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then(response => response.json())
                .then((productsArray) => {
                    // Sort products by name in alphabetical order
                    productsArray.sort((a, b) => a.name.localeCompare(b.name));
                    setProducts(productsArray);
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (price) {
                const highPriced = products.filter(product => product.price > 2)
                setProducts(highPriced)
            }
        },
        [price]
    )


    if (kandyUserObject.staff === true)
        return <>
            <h2> List of Products</h2>
            <button onClick={() => { filterPrice(true) }}>Top Priced</button>

            <article className="products">
                {
                    products.map(
                        (product) => {
                            return <section className="product" key={`product--${product.id}`}>
                                <header>--Product #{product.id}--</header>
                                <p>Name:{product.name}</p>
                                <p>Price:${product.price}</p>
                                <p>Type:{product.productType.category}</p>
                            </section>
                        }
                    )
                }
            </article>
        </>

    else return <>
        null
    </>
}