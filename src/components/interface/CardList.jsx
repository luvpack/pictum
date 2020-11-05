import React from 'react'
import PropTypes from "prop-types";

const CardsList = (props) => {
    // const types = ['none', 'primary', 'secondary', 'collection'

    return (
        <div className={`cards-list ${props.type}`}>
            { props.children }
        </div>
    )
}

CardsList.propTypes = {
    type: PropTypes.oneOf(['none', 'primary', 'secondary', 'collection']),
    children: PropTypes.array.isRequired
}

export default CardsList
