"use client";

import { MessageCircle, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { Book } from "@/lib/books-data";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookCardProps {
  book: Book;
}

const WHATSAPP_NUMBER = "212717841123";

export function BookCard({ book }: BookCardProps) {
  const [added, setAdded] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { addToCart, openCart } = useCart();

  const bookIdeaText = `هذا الكتاب للكاتب ${book.author} يقدم فكرة مركزة حول "${book.title}" بأسلوب واضح وممتع. ستخرج منه بفهم أفضل ورسائل عملية يمكنك تطبيقها في حياتك مباشرة.`;
  const motivationText = `اختيار رائع! "${book.title}" يقدم قيمة حقيقية لعقلك ووقتك. بسعر ${book.price} درهم فقط، هذا الكتاب استثمار بسيط بنتيجة كبيرة.`;

  const handleOrderClick = () => {
    const message = encodeURIComponent(
      `مرحباً مكتبة مداد،\n\nأود طلب الكتاب التالي:\n📚 ${book.title}\n✍️ ${book.author}\n💰 ${book.price} درهم\n\nشكراً لكم!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleAddToCart = () => {
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setTimeout(() => openCart(), 400);
  };

  return (
    <>
      <div
        className="group bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer"
        onClick={() => setIsDetailsOpen(true)}
      >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-accent/90 backdrop-blur-sm text-accent-foreground text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium">
          {book.category}
        </span>

        {/* Add to Cart Overlay Button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleAddToCart();
          }}
          id={`card-add-cart-${book.id}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary"
          aria-label="أضف للسلة"
        >
          {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          <span>{added ? "تمت الإضافة!" : "أضف للسلة"}</span>
        </button>
      </div>

      {/* Book Info */}
      <div className="p-3 sm:p-5">
        <h3 className="font-bold text-foreground text-sm sm:text-lg mb-0.5 sm:mb-1 line-clamp-1 text-balance">
          {book.title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-1">{book.author}</p>
        <p className="text-muted-foreground text-[10px] sm:text-xs mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
          {book.description}
        </p>

        {/* Price & Buttons */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-bold text-primary">{book.price}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">درهم</span>
            </div>
          </div>

          <div className="flex gap-2">
            {/* Add to Cart */}
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleAddToCart();
              }}
              id={`card-cart-btn-${book.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-3 py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium"
              style={{
                background: added ? "hsl(var(--primary))" : undefined,
                color: added ? "hsl(var(--primary-foreground))" : undefined,
              }}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">أضف للسلة</span>
                  <span className="sm:hidden">سلة</span>
                </>
              )}
            </button>

            {/* WhatsApp Order */}
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleOrderClick();
              }}
              id={`card-order-btn-${book.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm font-medium shadow-lg shadow-primary/20"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>اطلب الآن</span>
            </button>
          </div>
        </div>
      </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md text-right">
          <DialogHeader>
            <DialogTitle className="text-xl">{book.title}</DialogTitle>
            <DialogDescription className="text-sm">
              {book.author} - {book.category}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/40 p-3">
              <p className="text-sm font-semibold text-foreground mb-1">فكرة عن الكتاب</p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{bookIdeaText}</p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-sm font-semibold text-primary mb-1">لماذا ننصحك به؟</p>
              <p className="text-sm text-foreground leading-relaxed">{motivationText}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
