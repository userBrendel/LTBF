import ErrorMessage from "@/src/components/layout/ErrorMessage";
import CatalogueClient from "./components/CatalogueClient";
import { readAllFragrances } from "@/src/utils/general/product";

export default async function CataloguePage() {
  const { data, error } = await readAllFragrances();

  return (
    <main className="py-48 px-6 md:px-16 lg:px-48 space-y-8">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-3xl text-center">Catalogue</h1>
        <div className="flex-grow border-t border-black" />
      </div>

      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <CatalogueClient data={data ?? []} />
      )}
    </main>
  );
}
