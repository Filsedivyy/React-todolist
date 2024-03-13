import { useState } from "react";}


const oneTask = (value, id) => {

    return(
        <li key={id}>
            <p>{value}</p>
            <div className="button-container">
                <button>Edit</button>
                <button>Smazat</button>
            </div>
        </li>
    )

}