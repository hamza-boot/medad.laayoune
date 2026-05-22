"use client";

import { BookOpen, MessageCircle, MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const WHATSAPP_NUMBER = "212717841123";

export function Header() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("مرحباً، أود الاستفسار عن الكتب المتوفرة في مكتبة مداد");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">مداد</h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>العيون</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={openCart}
              id="header-cart-btn"
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-muted hover:bg-muted/70 transition-all duration-300 hover:scale-105"
              aria-label="سلة التسوق"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-primary text-primary-foreground text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-bounce">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              id="header-whatsapp-btn"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">تواصل معنا</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
