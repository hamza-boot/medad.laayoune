"use client";

import { BookCard } from "./book-card";
import type { Book } from "@/lib/books-data";
import { BookX } from "lucide-react";

interface BooksGridProps {
  books: Book[];
}

export function BooksGrid({ books }: BooksGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-6">
          <BookX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
        <p className="text-muted-foreground max-w-sm">
          لم نتمكن من العثور على كتب تطابق بحثك. جرب كلمات مختلفة أو تصفح التصنيفات.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
