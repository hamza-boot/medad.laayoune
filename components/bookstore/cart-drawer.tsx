"use client";

import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle, PackageOpen } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

const WHATSAPP_NUMBER = "212717841123";

export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, removeFromCart, updateQuantity, clearCart, closeCart } =
    useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const itemsList = items
      .map(
        (item, i) =>
          `${i + 1}. 📚 ${item.book.title}\n   ✍️ ${item.book.author}\n   الكمية: ${item.quantity}\n   السعر: ${item.book.price * item.quantity} درهم`
      )
      .join("\n\n");

    const message = encodeURIComponent(
      `مرحباً مكتبة مداد! 👋\n\nأود طلب الكتب التالية:\n\n${itemsList}\n\n─────────────────\n💰 المجموع الكلي: ${totalPrice} درهم\n\nشكراً جزيلاً! 🙏`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-all duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col transition-transform duration-400 ease-out"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg">سلة التسوق</h2>
              <p className="text-xs text-muted-foreground">{totalItems} عنصر</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            id="cart-close-btn"
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center">
                <PackageOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">السلة فارغة</p>
                <p className="text-sm text-muted-foreground">أضف بعض الكتب لتبدأ طلبك!</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.book.id}
                className="flex gap-3 bg-background rounded-2xl p-3 border border-border"
              >
                {/* صورة الكتاب */}
                <div className="relative w-14 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={item.book.cover}
                    alt={item.book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* المعلومات */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm mb-0.5 line-clamp-1">
                    {item.book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {item.book.author}
                  </p>
                  <div className="flex items-center justify-between">
                    {/* التحكم في الكمية */}
                    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        id={`cart-decrease-${item.book.id}`}
                        className="w-6 h-6 rounded-md bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all text-foreground"
                        aria-label="تقليل الكمية"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-foreground w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        id={`cart-increase-${item.book.id}`}
                        className="w-6 h-6 rounded-md bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all text-foreground"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-primary text-sm">
                      {item.book.price * item.quantity} درهم
                    </span>
                  </div>
                </div>

                {/* زر الحذف */}
                <button
                  onClick={() => removeFromCart(item.book.id)}
                  id={`cart-remove-${item.book.id}`}
                  className="self-start w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                  aria-label="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4">
            {/* المجموع */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">المجموع الكلي</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">{totalPrice}</span>
                <span className="text-muted-foreground">درهم</span>
              </div>
            </div>

            {/* زر الطلب عبر واتساب */}
            <button
              onClick={handleWhatsAppOrder}
              id="cart-whatsapp-order-btn"
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-500/30"
            >
              <MessageCircle className="w-5 h-5" />
              <span>اطلب الكل عبر واتساب</span>
            </button>

            {/* مسح السلة */}
            <button
              onClick={clearCart}
              id="cart-clear-btn"
              className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors text-center py-1"
            >
              مسح السلة
            </button>
          </div>
        )}
      </div>
    </>
  );
}
