"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/bookstore/header";
import { HeroSection } from "@/components/bookstore/hero-section";
import { BooksSlider } from "@/components/bookstore/books-slider";
import { SearchBar } from "@/components/bookstore/search-bar";
import { Categories } from "@/components/bookstore/categories";
import { BooksGrid } from "@/components/bookstore/books-grid";
import { CartDrawer } from "@/components/bookstore/cart-drawer";
import { Footer } from "@/components/bookstore/footer";
import { books } from "@/lib/books-data";

export default function BookstorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("جميع الكتب");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "جميع الكتب" || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4">
        {/* Image Slider - أعلى الصفحة */}
        <BooksSlider />

        <HeroSection />
        
        {/* Search & Filter Section */}
        <section className="py-8 space-y-6">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <Categories
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* Books Section */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === "جميع الكتب" ? "جميع الكتب" : selectedCategory}
            </h2>
            <span className="text-muted-foreground text-sm">
              {filteredBooks.length} كتاب
            </span>
          </div>
          
          <BooksGrid books={filteredBooks} />
        </section>
      </main>

      <Footer />

      {/* Cart Drawer - يظهر عند فتح السلة */}
      <CartDrawer />
    </div>
  );
}
