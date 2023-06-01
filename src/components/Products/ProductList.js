import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

export const ProductList = ({searchTermState}) => {
    const [products, setProducts] = useState([])
    const [price, filterPrice] = useState(false)
    const [searchedProducts, filterSearch] = useState([])

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

    useEffect(
        () => {
            const searchedCandy = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            filterSearch(searchedCandy)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            filterSearch(products)
        },
        [products]
    )


    return (
        <>
            {kandyUserObject.staff ? (
                <>
                    <button onClick={() => filterPrice(true)}>Top Priced</button>
                    <button onClick={handleAddProductClick}>Add New Product</button>

                    <article className="products">
                        {searchedProducts.map((product) => (
                            <section className="product" key={`product--${product.id}`}>
                                <header>--Product #{product.id}--</header>
                                <p>Name: {product.name}</p>
                                <p>Price: ${product.price}</p>
                                <p>Type: {product.productType.category}</p>
                            </section>
                        ))}
                    </article>
                </>
            ) : (
                <>
                    <button onClick={() => filterPrice(true)}>Top Priced</button>

                    <article className="products">
                        {searchedProducts.map((product) => (
                            <section className="product" key={`product--${product.id}`}>
                                <header>--Product #{product.id}--</header>
                                <p>Name: {product.name}</p>
                                <p>Price: ${product.price}</p>
                                <p>Type: {product.productType.category}</p>
                            </section>
                        ))}
                    </article>
                </>
            )}
        </>
    )
}
