'use client'

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    
    Object.keys(sectionRefs.current).forEach(key => {
      const element = sectionRefs.current[key];
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1, rootMargin: "50px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Video Section with Enhanced Overlay */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen">
        <video
          src="/aboutvid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        {/* Animated Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-2xl leading-tight mb-4">
              ABOUT US
            </h1>
            <div className="w-24 h-1 bg-black mx-auto opacity-80"></div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <section 
          ref={setRef('intro')}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-200 transform transition-all duration-1000 ease-out ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 lg:mb-8 text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
              LET THERE BE FRAGRANCE
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              In the beginning, when the world was void and formless, a whisper of creation filled the air—Let There Be Fragrance.
            </p>
            {/* Decorative Elements */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section 
          ref={setRef('mission')}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 transform transition-all duration-1000 ease-out ${
            isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 group">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 leading-tight transition-all duration-300 group-hover:text-gray-700">
                Mission
              </h2>
              <div className="flex justify-start">
                <div className="relative transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                  <div className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <Image
                    src="/flower.png"
                    alt="Mission - Fragrance Flower"
                    priority
                    width={300}
                    height={300}
                    className="object-contain w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-auto relative z-10 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center lg:min-h-[400px]">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed pl-8 italic">
                  At Let There Be Fragrance, our mission is to create captivating, high-quality scents that tell stories, spark memories, and celebrate individuality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section 
          ref={setRef('vision')}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 transform transition-all duration-1000 ease-out delay-200 ${
            isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="lg:col-span-4 xl:col-span-5 space-y-6 sm:space-y-8 order-1 lg:order-2 group">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 text-left lg:text-right leading-tight transition-all duration-300 group-hover:text-gray-700">
                Vision
              </h2>
              <div className="flex justify-start lg:justify-end">
                <div className="relative transform transition-all duration-500 hover:scale-105 hover:-rotate-2">
                  <div className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <Image
                    src="/flower.png"
                    alt="Vision - Fragrance Flower"
                    priority
                    width={300}
                    height={300}
                    className="object-contain w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-auto relative z-10 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-7 flex items-center lg:min-h-[400px] order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent lg:block hidden"></div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed pr-8 italic">
                  To awaken the senses and elevate everyday moments through the transformative power of fragrance, crafting a world where scent becomes a universal language of beauty, emotion, and identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section 
          ref={setRef('values')}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 transform transition-all duration-1000 ease-out delay-300 ${
            isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", desc: "Every scent tells a genuine story", icon: "✨" },
              { title: "Quality", desc: "Premium ingredients for exceptional experiences", icon: "🌿" },
              { title: "Innovation", desc: "Pushing boundaries in fragrance creation", icon: "🔬" }
            ].map((value, index) => (
              <div 
                key={value.title}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Quote Section */}
        <section 
          ref={setRef('quote')}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 transform transition-all duration-1000 ease-out delay-400 ${
            isVisible.quote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 text-center border-2 shadow-lg hover:shadow-xl transition-all duration-300">

            <div className="absolute top-4 left-4 text-6xl font-serif">"</div>
            <div className="absolute bottom-4 right-4 text-6xl font-serif rotate-180">"</div>
            
            <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800 leading-relaxed italic font-light max-w-4xl mx-auto relative z-10">
              Let There Be Fragrance is more than a brand. It's a movement. A quiet revolution of self-expression. Let scent be your story. Let it linger. Let it speak.
            </blockquote>
            <footer className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-semibold text-gray-900 uppercase tracking-wide">
              Let there be fragrance
            </footer>
          </div>
        </section>
      </div>

      {/* Bottom Spacing */}
      <div className="h-12 sm:h-16 md:h-20" />
    </div>
  );
};

export default AboutUs;