"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  slug: string;
  title: string;
  tags: string[];
  author: string;
  thumbnailImage: string;
  date: string;
};

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);

  useEffect(() => {
    const filterBlogs = () => {
      let filtered = blogs;

      if (searchTerm) {
        filtered = filtered.filter((blog) => {
          const searchStr = `${blog.title} ${blog.tags?.join(" ") || ""} ${
            blog.author || ""
          }`.toLowerCase();

          return searchStr.includes(searchTerm.toLowerCase());
        });
      }

      if (selectedTag !== "all") {
        filtered = filtered.filter((blog) => blog.tags?.includes(selectedTag));
      }

      setFilteredBlogs(filtered);
    };

    filterBlogs();
  }, [searchTerm, selectedTag, blogs]);

  const tags = getTopTags(blogs, 5);

  const allTagsForDisplay = ["all", ...tags];

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mt-4 flex flex-col gap-4 px-2">
        <input
          type="text"
          placeholder="Search articles..."
          className="bg-gray-800 text-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex overflow-x-auto gap-2 pb-2">
          {allTagsForDisplay.map((tag, i) => (
            <button
              key={i}
              className={`rounded-full px-4 py-2 text-sm cursor-pointer flex-shrink-0 ${
                selectedTag === tag
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } focus:outline-none`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag === "all" ? "All" : tag}{" "}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition hover:scale-[1.02]"
            >
              {blog.thumbnailImage && (
                <div className="relative w-full h-44">
                  <Image
                    src={`/assets/blog/${blog.thumbnailImage}`}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-400 ">
                  By {blog.author ?? "Author"} on{" "}
                  {blog.date ? formatDate(blog.date) : ""}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 px-2 mt-4 col-span-full">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;

const getTopTags = (blogs: Blog[], limit: number): string[] => {
  const tagCounts: { [key: string]: number } = {};

  blogs.forEach((blog) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag) => {
        if (tagCounts[tag]) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    }
  });

  const sortedTags = Object.entries(tagCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, limit);

  return sortedTags.map(([tag]) => tag);
};
