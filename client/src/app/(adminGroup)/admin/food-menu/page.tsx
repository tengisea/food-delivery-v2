import React from 'react'
import { FoodMenu, NavBar } from '../components'

const FoodMenuAdmin = () => {
  return (
    <div className="flex">
      <div>
        <NavBar />
      </div>
      <div className="bg-[#F4F4F5]">
        <FoodMenu />
      </div>
    </div>
  );
}

export default FoodMenuAdmin