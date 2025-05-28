import { Orders, NavBar } from "./components";
import { FoodImage } from "./components/FoodImage";

const AdminHomePage = () => {
  return (
    <div className="flex">
      <NavBar />
      <div className="flex-1 p-4 bg-[#F4F4F5]">
        <Orders />
      </div>
      {/* <FoodImage/> */}
    </div>
  );
};

export default AdminHomePage;