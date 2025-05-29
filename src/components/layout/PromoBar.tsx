type PromoBarProps = {
  children: string;
};

export default function PromoBar({ children }: PromoBarProps) {
  return (
    <div className="bg-black py-6 overflow-hidden relative">
      <div className="marquee-wrapper">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex">
            {[...Array(10)].map((_, j) => (
              <span key={j} className="text-white text-m font-semibold mx-5">
                {children}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
