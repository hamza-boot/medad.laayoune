"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { books } from "@/lib/books-data";
import { useCart } from "@/lib/cart-context";

// اختر أبرز 6 كتب للـ Slider
const featuredBooks = books.slice(0, 6);

export function BooksSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const { addToCart, openCart } = useCart();

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + featuredBooks.length) % featuredBooks.length);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play كل 4 ثوانٍ
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const handleAddToCart = (book: (typeof featuredBooks)[0]) => {
    addToCart(book);
    setAddedId(book.id);
    setTimeout(() => setAddedId(null), 1500);
    setTimeout(() => openCart(), 400);
  };

  const book = featuredBooks[current];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl my-6" style={{ minHeight: "420px" }}>
      {/* خلفية متدرجة */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, hsl(var(--accent)/0.25) 50%, hsl(var(--primary)/0.08) 100%)",
        }}
      />

      {/* المحتوى */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-6 md:p-12"
        style={{ minHeight: "420px" }}
      >
        {/* صورة الكتاب */}
        <div className="relative flex-shrink-0 group">
          <div
            className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
            style={{
              boxShadow: "0 30px 60px -10px hsl(var(--primary)/0.4)",
              transform: isAnimating ? "scale(0.95) rotateY(10deg)" : "scale(1) rotateY(0deg)",
            }}
          >
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* شارة Featured */}
          <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span>مميز</span>
          </div>
        </div>

        {/* معلومات الكتاب */}
        <div
          className="flex-1 text-center md:text-right space-y-4"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateX(20px)" : "translateX(0)",
            transition: "all 0.4s ease",
          }}
        >
          <div>
            <span className="inline-block bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full mb-3">
              {book.category}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 text-balance">
              {book.title}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-medium mb-3">
              {book.author}
            </p>
            <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 pt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-primary">{book.price}</span>
              <span className="text-muted-foreground text-lg">درهم</span>
            </div>

            <button
              onClick={() => handleAddToCart(book)}
              id={`slider-add-to-cart-${book.id}`}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              style={{
                background:
                  addedId === book.id
                    ? "hsl(142 76% 36%)"
                    : "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 8px 25px -5px hsl(var(--primary)/0.5)",
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{addedId === book.id ? "✓ أضيف للسلة!" : "أضف للسلة"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* أزرار التنقل */}
      <button
        onClick={prev}
        id="slider-prev-btn"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card hover:scale-110 transition-all duration-200 shadow-lg"
        aria-label="السابق"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={next}
        id="slider-next-btn"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card hover:scale-110 transition-all duration-200 shadow-lg"
        aria-label="التالي"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* نقاط المؤشر */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {featuredBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            id={`slider-dot-${i}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background:
                i === current
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground)/0.4)",
            }}
            aria-label={`انتقل للشريحة ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
