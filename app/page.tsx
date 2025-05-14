"use client";

import Image from "next/image";
import PromoBar from "./Components/PromoBar";
import ArrowButton from "./Components/ArrowButton";
import ProductCardHome from "./Components/ProductCardHome";
import FilledButton from "./Components/FilledButton";

export default function Home() {
  const padding_y = "24";

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
          <FilledButton href="/shop">Shop Now</FilledButton>
        </div>
      </section>

      {/* marquee */}
      <PromoBar
        text={
          "🔥 Promotion • New Fragrance Launch • 20% Off All Orders • Limited Time Offer • Shop Now"
        }
      />

      {/* popular fragrance */}
      <section className={`py-${padding_y} px-12 flex flex-col gap-8`}>
        <div className="flex items-center gap-8">
          <h2 className="font-bold text-3xl text-center whitespace-nowrap">
            Popular Fragrance
          </h2>
          <div className="flex-grow border-t border-black-300" />
        </div>

        <br />

        <div>
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
      <section className={`py-${padding_y} px-12`}>
        <div className="flex items-center gap-8">
          <div className="flex-grow border-t border-black-300" />
          <h2 className="font-bold text-3xl text-center whitespace-nowrap">
            About Us
          </h2>
        </div>
      </section>

      {/* new collection */}
      <section className={`py-${padding_y} px-12`}>
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
