"use client";

import { categories } from "@/lib/books-data";

interface CategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Categories({ selectedCategory, onCategoryChange }: CategoriesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-card text-foreground hover:bg-secondary border border-border"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
