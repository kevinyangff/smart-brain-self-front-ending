import React from 'react';
import {Redirect} from 'react-router';

const initState = {
    email: '',
    password: '',
    toHome: false
}
class Signin extends React.Component {
    constructor(props){
        super(props)
        this.state = initState;
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    } 

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmit = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                this.props.onGetUser({
                    name: data.name,
                    email: data.email,
                    id: data.id,
                    entries: data.entries,
                    joined: data.joined
                })
                this.setState({toHome: true})
            }
        })
        .catch(console.log)
    }

    render(){
        if (this.state.toHome){
            return (
                <Redirect to='/home' />
            )
        }
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={this.onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" />
                        </div>
                    </div>
                </div>
            </article>
            
        )
    }
}

export default Signin;