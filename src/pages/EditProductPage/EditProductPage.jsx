import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EditProductPage extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.product
    };
    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateProduct(this.state.formData);
    };

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity()
        });
    };

    render() {
        return (
            <>
            <h1>Edit Product</h1>
            <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Product's Name</label>
                    <input
                        className="form-control"
                        name="name"
                        value={this.state.formData.name}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                        <label>Product's Category (required)</label>
                        <input 
                            className="form-control"
                            name="category"
                            value={this.state.formData.category}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product's Specialty (required)</label>
                        <input 
                            className="form-control"
                            name="specialty"
                            value={this.state.formData.specialty}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product's Condition (required)</label>
                        <input 
                            className="form-control"
                            name="condition"
                            value={this.state.formData.condition}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product's Description (required)</label>
                        <input 
                            className="form-control"
                            name="description"
                            value={this.state.formData.description}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button
                    type="submit"
                    className="btn"
                    disabled={this.state.invalidForm}
                    >
                        SAVE UPDATED PRODUCT
                    </button>
                    <Link to="/">Cancel</Link>
            </form>
            </>
        );
    }
}

export default EditProductPage;