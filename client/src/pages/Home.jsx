import React from 'react';
import Header from "../components/layout/Header";
import Hero from "../components/route/Hero/Hero";
import Categories from '../components/route/Categories/Categories';
import BestDeals from '../components/route/BestDeals/BestDeals';
import ProductCard from '../components/route/ProductCard/ProductCard';

const Home = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero />
        <Categories />
        <BestDeals />
        <ProductCard />
    </div>
  )
}

export default Home;