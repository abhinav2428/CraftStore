import React from 'react';
import Header from "../components/layout/Header";
import Hero from "../components/route/Hero/Hero";
import Categories from '../components/route/Categories/Categories';
import BestDeals from '../components/route/BestDeals/BestDeals';

const Home = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero />
        <Categories />
        <BestDeals />
    </div>
  )
}

export default Home;