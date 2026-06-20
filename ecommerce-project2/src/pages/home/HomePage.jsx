import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import { useSearchParams } from 'react-router';

export function HomePage({ cart ,loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')
  useEffect(() => {
    const getProductData = async () => {
      let response
      if(search!=null){
        response = await axios.get(`/api/products?search=${search}`);        
        setProducts(response.data);
      }else{
        response = await axios.get('/api/products');
        setProducts(response.data);
      }
    };

    getProductData();
  }, [search]);


  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}