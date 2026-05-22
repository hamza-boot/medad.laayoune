"use client";

import { Search, MessageCircle, Package } from "lucide-react";

const features = [
  { icon: Search, label: "ابحث عن كتابك" },
  { icon: MessageCircle, label: "اطلب عبر واتساب" },
  { icon: Package, label: "استلم من المكتبة" },
];

export function HeroSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
          مكتبة مداد
          <br />
          <span className="text-primary">العيون</span>
        </h2>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
          ابحث عن كتابك المفضل واطلبه مباشرة عبر واتساب
          <br className="hidden sm:block" />
          بدون تعقيدات، فقط اختر واطلب!
        </p>

        {/* Features - Steps */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                {index + 1}
              </div>
              <div className="flex items-center gap-2">
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
