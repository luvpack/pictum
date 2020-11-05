import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Tabs extends React.Component {
    render() {
        return (
            <div className="tabs" style={{marginBottom: '40px'}}>
                {
                    this.props.tabs.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                to={item.to}
                                className={`button tab ${index === this.props.selected ? 'active' : ''}`}

                            >
                                {item.title}
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}

Tabs.propTypes = {
    tabs: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired
}

export default Tabs
