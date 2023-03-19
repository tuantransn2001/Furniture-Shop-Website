import React from "react";
import { Routes, Route } from "react-router-dom";
// ? Page
import HomePage from "~/pages/Home/HomePage/HomePage";
import AuthPage from "~/pages/Home/AuthPage/AuthPage";
import CategoryPage from "~/pages/Home/CategoryPage/CategoryPage";
import ContactPage from "~/pages/Home/ContactPage/ContactPage";
import InforPage from "~/pages/Home/InforPage/InforPage";
import ProductPage from "~/pages/Home/ProductPage/ProductPage";
import ProductDetailPage from "~/pages/Home/ProductDetailPage/ProductDetailPage";
import CheckoutPage from "~/pages/Home/CheckoutPage/CheckoutPage";
import BasketInfoPage from "~/pages/Home/BasketInfoPage/BasketInfoPage";
const routeAppData = [
  {
    path: "/",
    Component: <HomePage />,
  },
  {
    path: "/home/authenticate",
    Component: <AuthPage />,
  },
  {
    path: "/home/c/:name/:id",
    Component: <CategoryPage />,
  },
  {
    path: "/home/c/:name/:id/products",
    Component: <ProductPage />,
  },
  {
    path: "/home/p/:name/:id",
    Component: <ProductDetailPage />,
  },
  {
    path: "/home/contact",
    Component: <ContactPage />,
  },
  {
    path: "/home/information",
    Component: <InforPage />,
  },
  {
    path: "/home/checkout",
    Component: <CheckoutPage />,
  },
  {
    path: "/home/basket",
    Component: <BasketInfoPage />,
  },
];

const renderRoute = () => {
  return routeAppData.map(({ path, Component }) => {
    return <Route path={path} element={Component} key={path} />;
  });
};

const RouteApp = (props) => {
  return <Routes>{renderRoute()}</Routes>;
};

export default RouteApp;
