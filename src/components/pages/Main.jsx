import React from 'react'
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

class MainPage extends React.Component {
    render() {
        return (
            <main>
                <section className="hero">
                    <img style={{marginBottom: '20px'}} width="65x" src="/assets/images/logo.png" />
                    <h1 style={{marginBottom: '10px'}}>Pictum – innovation wallpapers<br/> for you.</h1>
                    <div className="subtitle" style={{marginBottom: '30px'}}>Make the world more beautiful with us</div>
                    <Link to={'/session?action=signup'} className="button">Sign Up</Link>
                </section>
                <section>
                    <img style={{borderRadius: '20px'}} height="30%" width="100%" src="/assets/images/dall-col.jpg" />
                </section>
            </main>
        )
    }
}

export default withRouter(MainPage)
