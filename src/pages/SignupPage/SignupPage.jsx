import React, { Component } from "react";
import {Link} from "react-router-dom";
import userService from "../../utils/userService";

class SignupPage extends Component {
    state = {
        invalidForm: true,
        formData: {
            name: "",
            email:"",
            password:"",
            message:""
        },
    };
    
    formRef = React.createRef();

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup({
                name: this.state.formData.name,
                email: this.state.formData.email,
                password: this.state.formData.password
            });

            this.props.handleSignupOrLogin();

            this.props.history.push = ("/");
        } catch (err) {
            this.updateMessage(err.message);
        }
    };

    handleChange = (e) => {
        const formData = {
            ...this.state.formData,
            [e.target.name]: e.target.value,
        };
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity(),
        });
    };
    updateMessage = (msg) => {
        this.setState({message: msg});
    }

    render() {
        return (
            <>
                <h1>Sign Up</h1>
                <form
                    ref={this.formRef}
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label>Your name (required)</label>
                        <input
                            className="form-group"
                            name="name"
                            value={this.state.formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Your email (required)</label>
                        <input
                            className="form-control"
                            name="email"
                            value={this.state.formData.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Your password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.formData.password}
                            onChange={this.handleChange}
                        />
                    </div>
                        <button
                            className="btn"
                            disabled={this.state.invalidForm}
                        >
                        SIGN UP
                        </button>
                </form>
            </>
        );
    }
}
export default SignupPage;