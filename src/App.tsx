import React, { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import ProductItem from "./components/ProductList";
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface CartProduct extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cơm Gà",
    image:
      "https://img.freepik.com/premium-photo/grilled-chicken-with-teriyaki-sauce-topped-rice_1339-104380.jpg?w=1060",
    price: 120000,
  },
  {
    id: 2,
    name: "Gà Rán",
    image:
      "https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?w=1060&t=st=1692263332~exp=1692263932~hmac=d2110a9db48d8480aa06d10a085c00026bbf18a5acfcc07862dd70a6e5ec2251",
    price: 120000,
  },
  {
    id: 3,
    name: "Salad Cá Hồi",
    image:
      "https://img.freepik.com/free-photo/raw-smoked-salmon-meat-fish_74190-6173.jpg?w=1060&t=st=1692263410~exp=1692264010~hmac=76b71f9edf5911fd15355267a039e3d2265d031390ff335a194e8f3a8e4c1f3f",
    price: 240000,
  },
  {
    id: 4,
    name: "Soup Bí Đỏ",
    image:
      "https://www.themacateam.com/product_images/uploaded_images/maca-soup-and-stews.png",
    price: 123000,
  },
  {
    id: 5,
    name: "Salad Rau",
    image:
      "https://img.freepik.com/free-photo/high-angle-view-delicious-salad-plate-wooden-background_176474-3780.jpg?w=1060&t=st=1692263520~exp=1692264120~hmac=8c572c2c596f9b2f0b17033ecdd9d187231604a834e8b7b5f2ff2322f127a687",
    price: 320000,
  },
  {
    id: 6,
    name: "Pizza",
    image:
      "https://product.hstatic.net/1000139524/product/z1972681755137_35bac1c11098597975259bb3770f9fd8_65d11f620ac343838423319d521d05f8_master.jpg",
    price: 120000,
  },
];

function App() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const addToCart = (key: number) => {
    const existingProduct = cartProducts.find(
      (product) => product.id === products[key].id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct: CartProduct = { ...products[key], quantity: 1 };
      setCartProducts([...cartProducts, newProduct]);
    }
  };

  const changeQuantity = (key: number, newQuantity: number) => {
    if (newQuantity === 0) {
      const updatedCartProducts = cartProducts.filter(
        (_, index) => index !== key
      );
      setCartProducts(updatedCartProducts);
    } else {
      const updatedCartProducts = cartProducts.map((product, index) =>
        index === key ? { ...product, quantity: newQuantity } : product
      );
      setCartProducts(updatedCartProducts);
    }
  };
  const calculateTotalPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };
  return (
    <div className={`container ${isCartOpen ? "active" : ""}`}>
      <header>
        <h1>Shopping Cart</h1>
        <div className="shopping" onClick={openCart}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhP2fO2WKaodSPckKsPQtLxkPsTSY6mp65XF4OyMm7mPTfCeRE3n-6WgTfbHiJdAwb2g&usqp=CAU"
            alt="Shopping Cart"
          />
          <span className="quantity">
            {cartProducts.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </span>
        </div>
      </header>

      <div className="list">
        {products.map((product, key) => (
          <ProductItem
            key={key}
            product={product}
            addToCart={() => addToCart(key)}
          />
        ))}
      </div>

      <Cart
        cartProducts={cartProducts}
        closeCart={closeCart}
        changeQuantity={changeQuantity}
        total={calculateTotalPrice()}
      />
    </div>
  );
}

export default App;
