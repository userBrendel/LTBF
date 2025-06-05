"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, Heart, ShoppingBag, User } from "lucide-react";
import SideBarWishlist from "./SideBarWishlist";
import SideBarNav from "./SideBarNav";
import { useAuth } from "@/src/context/AuthContext";
import SideBarShoppingBag from "./SideBarShoppingBag";

export default function NavBar() {
  const { session } = useAuth();

  const [isNavSideBarOpen, setNavSideBarOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [isCatalogueOpen, setCatalogueOpen] = useState(false);
  const [isShoppingBagOpen, setShoppingBagOpen] = useState(false);

  function closePanels() {
    setNavSideBarOpen(false);
    setWishlistOpen(false);
    setCatalogueOpen(false);
    setShoppingBagOpen(false);
  }

  return (
    <nav className="px-12 py-10 z-100 w-full flex justify-between items-center absolute top-0 left-0">
      {/* left */}
      <button
        onClick={() => {
          closePanels();
          setNavSideBarOpen(true);
        }}
      >
        <Menu size={28} />
      </button>

      {/* logo */}
      <Link href={"/"} className="absolute left-1/2 transform -translate-x-1/2">
        <Image
          src="/logo.png"
          alt="Let There Be Fragrance logo"
          width={50}
          height={50}
          className="w-12 h-auto "
          priority
        />
      </Link>

      {/* right */}
      <div className="flex items-center space-x-6 text-black">
        {/* search */}
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

        {/* wishlist */}
        {session && (
          <button
            onClick={() => {
              closePanels();
              setWishlistOpen(true);
            }}
            className="text-black flex items-center"
          >
            <Heart size={24} />
          </button>
        )}

        {/* shopping bag */}
        {session && (
          <button
            onClick={() => {
              closePanels();
              setShoppingBagOpen(true);
            }}
            className="text-black flex items-center"
          >
            <ShoppingBag size={24} />
          </button>
        )}

        <Link href={session ? "/account" : "/signin"}>
          <User size={24} />
        </Link>
      </div>

      {(isNavSideBarOpen || isWishlistOpen || isShoppingBagOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closePanels}
        />
      )}

      <SideBarNav
        isNavSideBarOpen={isNavSideBarOpen}
        closePanels={closePanels}
        isCatalogueOpen={isCatalogueOpen}
        setShopOpen={setCatalogueOpen}
      />

      {session && (
        <SideBarWishlist
          isWishlistOpen={isWishlistOpen}
          closePanels={closePanels}
        />
      )}

      {session && (
        <SideBarShoppingBag
          isShoppingBagOpen={isShoppingBagOpen}
          closePanels={closePanels}
        />
      )}
    </nav>
  );
}
