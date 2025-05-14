"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
} from "lucide-react";
import ProductCardWishlist from "./ProductCardWishlist";

const hoverClass =
  "relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-black before:scale-y-0 hover:before:scale-y-100 before:origin-top before:transition-transform before:duration-300";

export default function Header() {
  const [isNavSideBarOpen, setNavSideBarOpen] = useState(false);
  const [isWishListOpen, setWishlistOpen] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);

  const closePanels = () => {
    setNavSideBarOpen(false);
    setWishlistOpen(false);
  };

  return (
    <header className="px-12 py-10 relative z-100 w-full flex justify-between items-center">
      {/* left */}
      <div className="flex items-center space-x-6 text-black">
        <button
          onClick={() => {
            setNavSideBarOpen(true);
            setWishlistOpen(false);
          }}
          className="text-black flex items-center"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Ecommerce Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>

      {/* right */}
      <div className="flex items-center space-x-6 text-black">
        <div className="relative group flex items-center">
          <form
            action="/search"
            method="get"
            className="flex items-center w-full"
          >
            <input
              type="text"
              name="query"
              placeholder="Search fragrance"
              className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-sm text-gray-600 w-full border-none outline-none"
            />
            <Search
              size={24}
              className="text-black group-hover:text-gray-700 transition-colors duration-300"
            />
          </form>
          <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300" />
        </div>

        {/* Wishlist */}
        <button
          onClick={() => {
            setWishlistOpen(true);
            setNavSideBarOpen(false);
          }}
          className="text-black flex items-center"
        >
          <Heart size={24} />
        </button>

        <Link href="/cart">
          <ShoppingBag size={24} />
        </Link>
        <Link href="/LogIn">
          <User size={24} />
        </Link>
      </div>

      {(isNavSideBarOpen || isWishListOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closePanels}
        />
      )}

      {/* nav sidebar */}
      <div
        className={`fixed top-6 bottom-6 left-0 h-[calc(100%-4rem)] w-64 bg-white/80 backdrop-blur-md transform ${
          isNavSideBarOpen ? "translate-x-4" : "-translate-x-full"
        } transition-transform duration-600 ease-[cubic-bezier(0.77, 0, 0.175, 1)] z-50 rounded-xl shadow-xl overflow-hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closePanels} className="text-black">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 p-6 pt-2 text-black text-lg">
          <Link href="/" onClick={closePanels} className={hoverClass}>
            Home
          </Link>
          <Link href="/about" onClick={closePanels} className={hoverClass}>
            About Us
          </Link>
          <Link href="/contact" onClick={closePanels} className={hoverClass}>
            Contact
          </Link>

          <div>
            <button
              onClick={() => setShopOpen(!isShopOpen)}
              className={`flex justify-between items-center w-full ${hoverClass}`}
            >
              <span>Shop</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  isShopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isShopOpen && (
              <div className="mt-2 ml-2 flex flex-col text-base border-l border-gray-300 pl-3 space-y-2">
                <Link href="/shop" onClick={closePanels} className={hoverClass}>
                  All
                </Link>
                <Link
                  href="/shop/new"
                  onClick={closePanels}
                  className={hoverClass}
                >
                  New Collection
                </Link>
                <Link
                  href="/shop/bestseller"
                  onClick={closePanels}
                  className={hoverClass}
                >
                  Bestseller
                </Link>
                <Link
                  href="/shop/for-her"
                  onClick={closePanels}
                  className={hoverClass}
                >
                  For Her
                </Link>
                <Link
                  href="/shop/for-him"
                  onClick={closePanels}
                  className={hoverClass}
                >
                  For Him
                </Link>
                <Link
                  href="/shop/unisex"
                  onClick={closePanels}
                  className={hoverClass}
                >
                  Unisex
                </Link>
              </div>
            )}
          </div>

          <Link href="/faq" onClick={closePanels} className={hoverClass}>
            FAQ
          </Link>
        </div>
      </div>

      {/* wishlist sidebar */}
      <div
        className={`fixed top-6 bottom-6 right-0 w-144  bg-white/80 backdrop-blur-md transform ${
          isWishListOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-600 ease-[cubic-bezier(0.77, 0, 0.175, 1)] z-50 rounded-xl shadow-xl overflow-hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closePanels} className="text-black">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 p-6 pt-2 text-black text-lg">
          <div className="border-b flex justify-between items-center">
            <h2 className="text-2xl">Your Wishlist</h2>
            <h2>3 items</h2>
          </div>
          <div className="space-y-4">
            <ProductCardWishlist
              image="/perfume_default.png"
              name="Product name"
              price={255}
            />
            <ProductCardWishlist
              image="/perfume_default.png"
              name="Product name"
              price={255}
            />
            <ProductCardWishlist
              image="/perfume_default.png"
              name="Product name"
              price={255}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
