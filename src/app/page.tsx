import Image from "next/image";
import PromoBar from "../components/layout/PromoBar";
import Button from "../components/ui/FilledButton";
import ArrowButton from "../components/ui/ArrowButton";
import ProductCardHome from "../components/cards/ProductCardHome";
import FilledButton from "../components/ui/FilledButton";
import { filterProducts, sortProducts } from "./actions";

export default async function Home() {
  const { products: productsForHer, productsError: productsForHerError } =
    await filterProducts({
      column: "gender",
      value: "Her",
    });
  const { products: productsForHim, productsError: productsForHimError } =
    await filterProducts({
      column: "gender",
      value: "Him",
    });
  const { products: productsUnisex, productsError: productsUnisexError } =
    await filterProducts({
      column: "gender",
      value: "Unisex",
    });
  const {
    products: productsNewCollection,
    productsError: productsNewCollectionError,
  } = await filterProducts({
    column: "metadata->>collection",
    value: "2025",
  });
  const {
    products: productsBestSeller,
    productsError: productsBestSellerError,
  } = await sortProducts({
    column: "sales",
    ascending: false,
  });

  return (
    <>
      {/* hero */}
      <section className="w-full md:h-screen text-center grid grid-cols-1 md:grid-cols-2   mt-16  md:mt-0 overflow-hidden">
        {/* left */}
        <div className="w-full h-screen md:h-full px-6 md:pt-24 md:px-14 flex flex-col gap-10 items-center justify-center">
          <h1 className="text-3xl">
            In the beginning, when the world was void and formless, a whisper of
            creation filled the air—Let There Be Fragrance.
          </h1>

          <Image
            src="/perfume_bottle.png"
            alt="perfume bottle"
            priority
            width={300}
            height={300}
            className="object-contain w-48 md:w-64"
          />
        </div>

        {/* right */}
        <div
          className="w-full h-screen md:h-screen px-6 md:pb-24 md:px-14 flex flex-col gap-10 items-center justify-center md:justify-end bg-cover bg-center"
          style={{ backgroundImage: "url('/clouds.png')" }}
        >
          <div>
            <h1 className="text-4xl">
              A sweet aroma, a reflection of His love.
            </h1>
            <p className="text-xl">A sweet aroma, a reflection of His love.</p>
          </div>
          <Button size="xl" href="/catalogue">
            Shop Now
          </Button>
        </div>
      </section>

      {/* marquee */}
      <PromoBar>
        🔥 Promotion • New Fragrance Launch • 20% Off All Orders • Limited Time
        Offer • Shop Now
      </PromoBar>

      {/* popular fragrance */}
      <section className="py-24 px-6 md:px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-3xl text-center">Popular Fragrance</h1>
          <div className="flex-grow border-t border-black" />
        </div>

        <br />

        <div className="flex justify-start">
          <ArrowButton type="right" href="/catalogue?filter=for+her">
            For Her
          </ArrowButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {productsForHer?.map((product) => (
            <ProductCardHome
              key={product.id}
              image={"/perfume_default.png"}
              name={product.name}
              price={product.price}
              href={`/product/${product.id}`}
            />
          ))}
        </div>

        <br />

        <div className="flex justify-end">
          <ArrowButton type="left" href="/catalogue?filter=for+him">
            For Him
          </ArrowButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {productsForHim?.map((product) => (
            <ProductCardHome
              key={product.id}
              image={"/perfume_default.png"}
              name={product.name}
              price={product.price}
              href={`/product/${product.id}`}
            />
          ))}
        </div>

        <br />

        <div className="flex justify-start">
          <ArrowButton type="right" href="/catalogue?filter=unisex">
            Unisex
          </ArrowButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {productsUnisex?.map((product) => {
            return (
              <ProductCardHome
                key={product.id}
                image={"/perfume_default.png"}
                name={product.name}
                price={product.price}
                href={`/product/${product.id}`}
              />
            );
          })}
        </div>
      </section>

      {/* about us */}
      <section className="py-24 px-6 md:px-16 lg:px-48 space-y-12">
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t border-black" />
          <h1 className="font-bold text-3xl text-center">About Us</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/scent_studio1.png"
                alt="about"
                priority
                width={450}
                height={450}
                className="object-contain w-full max-w-md"
              />
            </div>

            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-xl font-bold">Vision</h2>
              <p className="text-lg">
                To awaken the senses and elevate everyday moments through the
                transformative power of fragrance, crafting a world where scent
                becomes a universal language of beauty, emotion, and identity.
              </p>
            </div>
          </div>

          <div className="space-y-20">
            <div className="space-y-2 text-center md:text-right">
              <h2 className="text-xl font-bold">Let There Be Fragrance</h2>
              <p className="text-lg">
                In the beginning, when the world was void and formless, a
                whisper of creation filled the air—Let There Be Fragrance.
              </p>
            </div>

            <div className="space-y-2 text-center md:text-right">
              <h2 className="text-xl font-bold">Mission</h2>
              <p className="text-lg">
                At Let There Be Fragrance, our mission is to create captivating,
                high-quality scents that tell stories, spark memories, and
                celebrate individuality.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <Image
                src="/scent_studio2.png"
                alt="about"
                priority
                width={400}
                height={400}
                className="object-contain w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* new collection */}
      <section className="py-24 px-6 md:px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-3xl text-center">New Collection</h1>
          <div className="flex-grow border-t border-black" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {productsNewCollection?.map((product) => (
            <ProductCardHome
              key={product.id}
              image={"/perfume_default.png"}
              name={product.name}
              price={product.price}
              href={`/product/${product.id}`}
            />
          ))}
        </div>
      </section>

      {/* best seller */}
      <section className="py-24 px-6 md:px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t border-black" />
          <h1 className="font-bold text-3xl text-center">Best Seller</h1>
          <div className="flex-grow border-t border-black" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {productsBestSeller?.map((product) => (
            <ProductCardHome
              key={product.id}
              image={"/perfume_default.png"}
              name={product.name}
              price={product.price}
              href={`/product/${product.id}`}
            />
          ))}
        </div>
      </section>

      {/* discover more */}
      <section className="py-24 px-6 md:px-16 lg:px-48 space-y-8  border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <Image
              src="/boats.png"
              alt="about"
              priority
              width={450}
              height={450}
              className="object-contain w-full max-w-sm"
            />
          </div>

          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="font-bold text-3xl">DISCOVER MORE OF LTBF</h1>
              <p className="text-lg">
                In the beginning, when the world was void and formless, a
                whisper of creation filled the air—Let There Be Fragrance.
              </p>
            </div>

            <div className="space-y-8 text-lg">
              <input
                className="w-full border-b py-2 focus:outline-none focus:ring-0"
                placeholder="Name"
              />
              <input
                className="w-full border-b py-2 focus:outline-none focus:ring-0"
                placeholder="E-mail"
              />
            </div>

            <div className="flex justify-end">
              <FilledButton size="xl">Subscribe</FilledButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
