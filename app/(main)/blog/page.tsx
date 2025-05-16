import BlogList from "@/components/BlogList";
import { getAllBlogs } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & Articles",
  description:
    "Explore insightful blogs and articles written by professionals.",
};

const BlogPage = () => {
  const blogs = getAllBlogs();

  return (
    <main className="flex flex-col items-center justify-center px-4">
      <div className="text-center py-10 w-full max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-2 tracking-wide">
          Blogs & Articles
        </h1>
        <p className="text-md md:text-lg text-gray-300">
          Discover trends & insights on tech
        </p>
      </div>

      <BlogList blogs={blogs} />
    </main>
  );
};

export default BlogPage;
