import React from 'react'
import PropTypes from 'prop-types'

function Avatar(props) {
    return (
        <a className={`avatar ${props.type}`}>
            <div
                style={{
                    backgroundImage: `url('${props.src}')`,
                }}>
            </div>
        </a>
    )
}

Avatar.propTypes = {
    src: PropTypes.string,
    type: PropTypes.oneOf(['none', 'big'])
}

export default Avatar
