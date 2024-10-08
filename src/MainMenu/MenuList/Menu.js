import React, { useState, useEffect } from "react";
import "./MenuListCss/Menu.css";
import "./MenuListCss/Sidebar.css"; // Sidebar CSS 추가
import ShoppingCart from "../Shopping/ShoppingCart.js";
import CoffeeCard from "./CoffeeCard.js";
import Login from "../Login/Login.js"; // 확장자 추가
import axios from "axios";

import allMenu from "./images/allmenu.png";
import coffee from "./images/coffee.png";
import milk from "./images/milk.png";
import bobaan from "./images/bobaan.png";
import iceCream from "./images/icecream.png";
import dessert from "./images/dessert.png";
import americano from "./images/americano.png";
import caramel from "./images/caramel.png";
import frappu from "./images/frappuccino.png";
import dalgona from "./images/dalgona.png";
import cafelatte from "./images/cafelatte.jpg";
import cafemoca from "./images/cafemoca.jpg";
import hazelnuts from "./images/hazelnuts.jpg";
import cappuccino from "./images/cappuccino.jpg";

function Sidebar() {
  return (
    <div className="Sidebar-container">
      <div className="Sidebar-Wrapper">
        <div className="Sidebar-Menu">
          <div className="SidebarListTitle">
            <img src="/CaffeIcon/CaffeLogo.png" alt="CaffeLogo" />
          </div>
          <div className="SidebarListItem">
            <img src="/CaffeIcon/Home.png" alt="HomeLogo" />
          </div>
          <div className="SidebarListItem">
            <img src="/CaffeIcon/Option.png" alt="OptionLogo" />
          </div>
          <div className="SidebarListItem">
            <Login /> {/* 로그인 버튼 추가 */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu({ onCheckout }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [mileage, setMileage] = useState(0);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
      fetchUserInfo(); // 사용자 정보 가져오기
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/get_user_info");
      if (response.status === 200) {
        setNickname(response.data.nickname);
        setMileage(response.data.mileage);
      } else {
        console.error("Error fetching user info:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const removeFromCart = (itemToRemove) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.name === itemToRemove.name
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(existingItemIndex, 1);
      setCartItems(updatedCartItems);
    }
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].count += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, count: 1 }]);
    }
  };

  //카페 메뉴 아이템리스트

  const menuItems = [
    {
      name: "아메리카노",
      image: americano,
      description: "Caff Americano",
      price: "4000",
    },
    {
      name: "카라멜 마끼아또",
      image: caramel,
      description: "Caramel Macchiato",
      price: "4500",
    },
    {
      name: "프라푸치노",
      image: frappu,
      description: "Frappuccino Coffee",
      price: "5000",
    },
    {
      name: "달고나 커피",
      image: dalgona,
      description: "Dalgona Coffee",
      price: "4500",
    },
    {
      name: "카페라떼",
      image: cafelatte,
      description: "CafeLatte",
      price: "5000",
    },
    {
      name: "카페모카",
      image: cafemoca,
      description: "CafeMoca",
      price: "5500",
    },
    {
      name: "헤이즐넛",
      image: hazelnuts,
      description: "Hazelnuts",
      price: "4500",
    },
    {
      name: "카푸치노",
      image: cappuccino,
      description: "Cappuccino",
      price: "5500",
    },
    // 더 많은 메뉴 아이템들을 추가할 수 있습니다.
  ];

  const itemsPerPage = 4;
  const numPages = Math.ceil(menuItems.length / itemsPerPage);

  const getPageItems = (pageNumber) => {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return menuItems.slice(startIndex, endIndex);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % numPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? numPages - 1 : prevPage - 1
    );
  };

  const handleCategoryClick = (category) => {
    if (category === "allmenu") alert("전체 메뉴");
    else if (category === "coffee") alert("커피 메뉴");
    else if (category === "milk") alert("우유");
    else if (category === "bobaan") alert("버블티");
    else if (category === "iceCream") alert("아이스크림");
    else if (category === "dessert") alert("디저트");
    else alert("잘못된 클릭입니다.");
  };

  return (
    <div className="menu-container">
      <Sidebar /> {/* Sidebar 통합 */}
      <div className="app-container">
        <div className="login-status">
          {isLoggedIn ? (
            <div>
              <p className="welcome-text">{nickname} 님 환영합니다!</p>
              <p className="status-text">닉네임: {nickname}</p>
              <p className="status-text">마일리지 : {mileage}</p>
              <p className="status-text status-on">로그인 상태: ON</p>
            </div>
          ) : (
            <div>
              <p className="welcome-text">비회원 로그인</p>
              <p className="status-text status-off">로그인 상태: OFF</p>
            </div>
          )}
        </div>
        <div className="card-container">
          <div
            className="card"
            onClick={() => handleCategoryClick("allmenu")}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick("allmenu");
              }
            }}
          >
            <img src={allMenu} alt="AllMenu" />
            <p>AllMenu</p>
          </div>
          <div
            className="card"
            onClick={() => handleCategoryClick("coffee")}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick("coffee");
              }
            }}
          >
            <img src={coffee} alt="Coffee" />
            <p>Coffee</p>
          </div>
          <div
            className="card"
            onClick={() => handleCategoryClick("milk")}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick("milk");
              }
            }}
          >
            <img src={milk} alt="Milky milk" />
            <p>Milky milk</p>
          </div>
          <div
            className="card"
            onClick={() => handleCategoryClick("bobaan")}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick("bobaan");
              }
            }}
          >
            <img src={bobaan} alt="Bobaan" />
            <p>Bobaan</p>
          </div>
          <div
            className="card"
            onClick={() => handleCategoryClick("iceCream")}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick("iceCream");
              }
            }}
          >
            <img src={iceCream} alt="Ice cream" />
            <p>Ice cream</p>
          </div>
          <div
            className="card"
            onClick={() => handleCategoryClick("dessert")}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick("dessert");
              }
            }}
          >
            <img src={dessert} alt="Dessert" />
            <p>Dessert</p>
          </div>
        </div>

        <div className="title">
          <h1>Coffee Menu</h1>
          <p>메뉴 목록: {menuItems.length}개</p>
        </div>

        <div className="slider-container">
          <div className="card-grid">
            {getPageItems(currentPage).map((item, index) => (
              <div key={index} className="coffee-card">
                <CoffeeCard
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button onClick={goToPrevPage}>이전</button>
            <button onClick={goToNextPage}>다음</button>
          </div>
        </div>
        <ShoppingCart
          items={cartItems}
          removeFromCart={removeFromCart}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  );
}

export default Menu;
