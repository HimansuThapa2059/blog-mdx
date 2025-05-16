import { BlogPost } from "@/types/blogTypes";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "blog");

export const getAllBlogs = (): Omit<BlogPost, "content">[] => {
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const { data } = matter(fileContents);

      const blogPost = {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date(),
        tags: (data.tags as string[]) || [],
        thumbnailImage: data.thumbnailImage || "default.jpg",
        author: data.author || "Unknown",
      };

      return blogPost;
    });
  } catch (error) {
    console.error("Error reading blogs directory:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    const blogPost: BlogPost = {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date(),
      tags: (data.tags as string[]) || [],
      thumbnailImage: data.thumbnailImage || "default.jpg",
      author: data.author || "Unknown",
      content: htmlContent,
    };

    return blogPost;
  } catch (error) {
    console.error(`Error reading blog post with slug ${slug}:`, error);
    return null;
  }
};
