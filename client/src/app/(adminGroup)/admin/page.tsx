import { Orders, NavBar } from "./components";
import { FoodImage } from "./components/FoodImage";

const AdminHomePage = () => {
  return (
    <div className="flex">
      <NavBar/>
      <Orders/>
      {/* <FoodImage/> */}
    </div>
  );
};

export default AdminHomePage;