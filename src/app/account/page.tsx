import YourAddressBookFormClient from "./components/YourAddressBookFormClient";
import YourAccountFormClient from "./components/YourAccountFormClient";
import AccountIntroClient from "./components/AccountIntroClient";

export default function AccountPage() {
  return (
    <main className="space-y-48 py-48">
      <section className="px-6 md:px-16 lg:px-48 space-y-8">
        <AccountIntroClient />
      </section>

      <section className="px-6 md:px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t border-black" />
          <h1 className="font-bold text-3xl text-center">Your Information</h1>
          <div className="flex-grow border-t border-black" />
        </div>

        <div className="px-6 md:px-16 lg:px-48 space-y-8 max-w-4xl mx-auto">
          <YourAccountFormClient />
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-48 space-y-8">
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t border-black" />
          <h1 className="font-bold text-3xl text-center">Your Address Book</h1>
          <div className="flex-grow border-t border-black" />
        </div>

        <div className="px-6 md:px-16 lg:px-48 space-y-8 max-w-4xl mx-auto">
          <YourAddressBookFormClient />
        </div>
      </section>
    </main>
  );
}
