import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./components/Cart";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Products from "./components/Products";
import About from "./components/About";
import User from "./components/User";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Order from "./components/Order";
import OrderUser from "./components/OrderUser";
import OrderProduct from "./components/OrderProduct";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/menu" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/users" element={<User />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/user/:id" element={<OrderUser />} />
        <Route path="/order-product/:id" element={<OrderProduct />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/delete/:id" element={<DeleteUser />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
