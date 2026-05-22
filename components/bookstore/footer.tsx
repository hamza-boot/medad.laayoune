"use client";

import { BookOpen, MapPin, MessageCircle, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "212717841123";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">مكتبة مداد</span>
          </div>

          {/* Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>العيون، المغرب</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>يومياً من 9 صباحاً - 9 مساءً</span>
            </div>
          </div>

          {/* WhatsApp Contact */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 rounded-full transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل معنا عبر واتساب</span>
          </a>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            جميع الحقوق محفوظة لمكتبة مداد {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
