import React from 'react'
import PropTypes from "prop-types";

import {Link} from "react-router-dom";

const Card = (props) => {
    return (
        <Link to={props.href}>
            <div className='image-card' style={{backgroundImage: `url('${props.imageUrl}')`}}>
                <div className='about'>
                    <h2>{props.title}</h2>
                    {
                        props.author ? <div className='subtitle'>by {`${props.author}`}</div> : null
                    }
                </div>
            </div>
        </Link>
    )
}

Card.propTypes = {
    imageUrl: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
}

export default Card
