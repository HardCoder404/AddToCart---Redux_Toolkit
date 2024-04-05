import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {carts} = useSelector((item)=>item.counter)
  return (
    <div className="">
      <div className="navbar bg-red-500 rounded-full flex justify-between items-center p-3">
        <span className="text-xl font-semibold text-white">DummyApp</span>
        <Link to={"/cart"}>
        <div className="relative">
  <i className="fa-solid fa-cart-plus mr-5 text-2xl "></i>
  <span className="relative top-[-17px] right-5  text-sm font-bold">{carts.length}</span>
        </div>
        </Link>
      </div>
      <div className="mt-8">
        {/* Card component */}
        <Card />
      </div>
    </div>
  );
};

export default Navbar;
