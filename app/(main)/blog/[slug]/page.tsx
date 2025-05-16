import { getPostBySlug } from "@/lib/blog";
import React from "react";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="px-4">
      <h1 className="text-4xl pb-6 text-center font-semibold text-blue-400">
        {post.title}
      </h1>
      <p>{post.date}</p>

      <div className="prose prose-invert max-w-none blog-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "blog not found" };

  return {
    title: post.title,
    description: `${post.title} by ${post.author} on ${post.date}`,
  };
}
