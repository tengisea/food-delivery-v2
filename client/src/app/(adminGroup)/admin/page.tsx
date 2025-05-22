import { Orders, NavBar } from "./components";

const AdminHomePage = () => {
  return (
    <div className="flex">
      <NavBar/>
      <Orders/>
    </div>
  );
};

export default AdminHomePage;
