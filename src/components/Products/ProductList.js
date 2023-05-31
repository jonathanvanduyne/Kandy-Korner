import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [price, filterPrice] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

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

    const handleAddProductClick = () => {
        navigate("./ProductForm")
    }



    return (
        <>
            <h2>List of Products</h2>
            <button onClick={() => filterPrice(true)}>Top Priced</button>

            {kandyUserObject.staff === true && (
                <button onClick={handleAddProductClick}>Add New Product</button>
            )}

            <article className="products">
                {products.map((product) => (
                    <section className="product" key={`product--${product.id}`}>
                        <header>--Product #{product.id}--</header>
                        <p>Name: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        <p>Type: {product.productType.category}</p>
                    </section>
                ))}
            </article>
        </>
    )
                }