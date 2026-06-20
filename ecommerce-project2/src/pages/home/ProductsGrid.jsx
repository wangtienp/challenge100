import { Product } from './Product';
export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        
        return (
          <div key={product.id} className="product-container" data-testid="product-container">
            <Product product={product} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
}