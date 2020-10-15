import React, {Component} from 'react';

class AddProductPage extends Component {
    state = {
        invalidForm: true,
        formData: {
            name: '',
            category: 'Medical instrument',
            specialty: 'Medical',
            condition: 'Good condition',
            description: ''
        }
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleAddProduct(this.state.formData);
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
                <h1>Add Product</h1>
                <form ref={this.formRef} autoCompelte="off" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Product's Name (required)</label>
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
                        ADD PRODUCT
                    </button>

                </form>
            </>
        )
    }
}

export default AddProductPage;