import FragranceCardHome from "@/src/components/cards/FragranceCard";
import FragranceReviewPolicyClient from "./components/FragranceReviewPolicyClient";
import FragranceCardClient from "./components/FragranceCardClient";
import ErrorMessage from "@/src/components/layout/ErrorMessage";
import {
  readOneFragrance,
  readSuggestedFragrances,
} from "@/src/utils/general/fragrance";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product, error: productError } = await readOneFragrance(id);
  const { data: suggested, error: suggestedError } =
    await readSuggestedFragrances(id);

  return (
    <main className="space-y-48 py-48">
      {productError ? (
        <section className="px-6 md:px-16 lg:px-48 space-y-8">
          <ErrorMessage>{productError}</ErrorMessage>
        </section>
      ) : (
        <>
          <section className=" px-6 md:px-16 lg:px-48 space-y-8">
            <FragranceCardClient product={product} />
          </section>

          <section className="px-6 md:px-16 lg:px-48 space-y-8">
            <FragranceReviewPolicyClient />
          </section>

          {suggestedError ? (
            <section className="px-6 md:px-16 lg:px-48 space-y-8">
              <ErrorMessage>{suggestedError}</ErrorMessage>
            </section>
          ) : (
            suggested &&
            suggested.length > 0 && (
              <>
                <section className="px-6 md:px-16 lg:px-48 space-y-8">
                  <div className="flex items-center gap-4">
                    <h1 className="font-bold text-3xl text-center">
                      Suggestions
                    </h1>
                    <div className="flex-grow border-t border-black" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
                    {suggested?.map((product) => (
                      <FragranceCardHome key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              </>
            )
          )}
        </>
      )}
    </main>
  );
}
