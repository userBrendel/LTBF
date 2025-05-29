import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-12 border-t space-y-16 text-center md:text-left">
      <section className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Image
          src="/logo.png"
          alt="Ecommerce Logo"
          width={50}
          height={50}
          priority
        />
        <h1>LET THERE BE FRAGRANCE</h1>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5 md:justify-items-center gap-8">
        <div className="flex flex-col">
          <h1 className="font-bold">Contact Us</h1>
          <Link href="#">04 548 8778</Link>
          <Link href="#">info@ltbl-institute.net</Link>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold">Follow Us</h1>
          <a href="https://www.tiktok.com" target="_blank">
            TikTok
          </a>
          <a href="https://www.facebook.com" target="_blank">
            Facebook
          </a>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold">Quick Links</h1>
          <Link href="#">Shop</Link>
          <Link href="#">Bestseller</Link>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold">Assistance</h1>
          <Link href="#">Shipping & Returns</Link>
          <Link href="#">Payment</Link>
        </div>

        <div>
          <h1 className="font-bold">Stay Connected</h1>
          <Link href="#">Subscribe</Link>
        </div>
      </section>

      <section className="flex justify-between gap-4">
        <Link href="#">Privacy Policy</Link>
        <h1>© LTBF 2025</h1>
      </section>
    </footer>
  );
}
