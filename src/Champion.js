import React from 'react'

const Champion = ({name}) => {
    return (
        <div className="champion">
            <img src={`./img/${name}_0.jpg`} width="100px" />
            <h4>{name}</h4>
        </div>
    )
}

export default Champion
