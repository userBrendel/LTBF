"use client";

import Image from "next/image";
import PromoBar from "./Components/ProductCard/PromoBar";
import Button from "./Components/Button/FilledButton"
import ArrowButton from "./Components/Button/ArrowButton";
import ProductCardHome from "./Components/ProductCard/ProductCardHome";

export default function Home() {
  return (
    <>
      {/* hero */}
      <section className="w-full md:h-screen text-center grid grid-cols-1 md:grid-cols-2">
        {/* left */}
        <div className="h-screen md:h-full w-full px-6 md:pt-24 md:px-14 flex flex-col gap-10 items-center justify-center">
          <h1 className="text-3xl">
            In the beginning, when the world was void and formless, a whisper of
            creation filled the air—Let There Be Fragrance.
          </h1>

          <Image
            src="/perfume_bottle.png"
            alt="perfume bottle"
            priority
            width={250}
            height={250}
          />
        </div>

        {/* right */}
        <div
          className="h-screen md:h-full w-full px-6 md:pb-24 md:px-14 flex flex-col gap-10 items-center justify-center md:justify-end bg-cover bg-center"
          style={{ backgroundImage: "url('home_clouds.png')" }}
        >
          <div>
            <h1 className="text-4xl">
              A sweet aroma, a reflection of His love.
            </h1>
            <p className="text-xl">A sweet aroma, a reflection of His love.</p>
          </div>
          <Button href="/shop">Shop Now</Button>
        </div>
      </section>

      {/* marquee */}
      <PromoBar
        text={
          "🔥 Promotion • New Fragrance Launch • 20% Off All Orders • Limited Time Offer • Shop Now"
        }
      />

      {/* popular fragrance */}
      <section className="py-24 px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-8">
          <h2 className="font-bold text-3xl text-center whitespace-nowrap">
            Categories
          </h2>
          <div className="flex-grow border-t border-black-300" />
        </div>

        <br />

        <div className="flex justify-center md:justify-start">
          <ArrowButton type="right">For Her</ArrowButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
        </div>

        <br />

        <div className="text-right">
          <ArrowButton type="left">For Him</ArrowButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
        </div>

        <br />

        <div>
          <ArrowButton type="right">Unisex</ArrowButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
          <ProductCardHome
            image={"/perfume_default.png"}
            name={"Perfume name"}
            price={255}
          />
        </div>
      </section>

      {/* about us */}
      <section className="py-24 px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-8">
          <div className="flex-grow border-t border-black-300" />
          <h2 className="font-bold text-3xl text-center whitespace-nowrap">
            About Us
          </h2>
        </div>

        <div className="flex">
          <div>asdadad</div>
          <div>asd</div>
        </div>
      </section>

      {/* new collection */}
      <section className="py-24 px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-8">
          <h2 className="font-bold text-3xl text-center whitespace-nowrap">
            New Collection
          </h2>
          <div className="flex-grow border-t border-black-300" />
        </div>
      </section>
    </>
  );
}
