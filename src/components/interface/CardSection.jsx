import React from 'react'
import PropTypes from "prop-types";

import CardsList from "./CardList.jsx";

const CardSection = (props) => {
    return (
        <section>
            <h2>{props.title}</h2>
            <CardsList type={props.type}>
                { props.children }
            </CardsList>
        </section>
    )
}

CardSection.propTypes = {
    title: PropTypes.string,
    type: PropTypes.oneOf(['none', 'primary', 'secondary', 'collection']),
    children: PropTypes.array.isRequired
}

export default CardSection
