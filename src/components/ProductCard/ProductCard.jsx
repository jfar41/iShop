import React from 'react';
import {Link} from 'react-router-dom';

function ProductCard({product}) { 
  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <h3 className='panel-title'>{product.name}</h3>
      </div>
      <div className='panel-body'>
        <dl>
          <dt>Condition</dt>
          <dd>{product.condition}</dd>
          <dt>Category</dt>
          <dd>{product.category}</dd>
          <dt>Specialty</dt>
          <dd>{product.specialty}</dd>
          <dt>Description</dt>
          <dd>{product.description}</dd>
          <dt>Seller</dt>
          <dd>link2seller profile coming soon...</dd>
        </dl>
      </div>
      <div className='panel-footer'>
        <Link to='/'>RETURN TO LIST</Link>
      </div>
    </div>
  );
}

export default ProductCard;