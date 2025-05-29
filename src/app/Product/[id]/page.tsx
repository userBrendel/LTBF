import { readSingleProduct } from "./actions";
import ProductClient from "./components/ProductClient";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product, productError } = await readSingleProduct(id);

  return (
    <section className="mt-16 py-24 px-6 md:px-16 lg:px-48 space-y-8">
      <ProductClient product={product} />

      <div>
        <p>asdasdasdad</p>
      </div>
    </section>
  );
}
