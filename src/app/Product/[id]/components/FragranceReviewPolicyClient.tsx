"use client";

import { useState } from "react";

export default function FragranceReviewPolicyClient() {
  const [activeTab, setActiveTab] = useState<"reviews" | "policy">("reviews");

  return (
    <>
      <div className="flex justify-center items-center text-xl gap-8">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-8 py-4 border ${
            activeTab === "reviews" ? "bg-black text-white" : ""
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("policy")}
          className={`px-8 py-4 border ${
            activeTab === "policy" ? "bg-black text-white" : ""
          }`}
        >
          Policy
        </button>
      </div>

      <div className="grid place-items-center">
        {activeTab === "reviews" && (
          <div>
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}

        {activeTab === "policy" && (
          <div>
            <p>
              We accept returns within 30 days of purchase. Items must be unused
              and in original packaging. Shipping typically takes 3–7 business
              days.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
