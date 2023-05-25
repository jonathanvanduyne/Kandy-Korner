import { useEffect, useState } from "react"
import "./locationList.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
    <h2>List of Locations</h2>

    <article className="locations">
        {
            locations.map(
                (location) => {
                    return <section className="location" key={`location--${location.id}`}>
                        <header>--Location #{location.id}--</header>
                        <p>Address:{location.address}</p>
                        <p>Square Footage:{location.sqFootage}</p>
                    </section>
                }
            )
        }
    </article>
</>
}