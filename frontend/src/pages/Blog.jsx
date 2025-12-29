import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top Trends for Summer 2025",
      excerpt:
        "Discover the hottest fashion trends that will dominate this summer. From vibrant colors to relaxed fits...",
      date: "May 15, 2025",
      image: assets.p_img1, // Using product images as placeholders
      author: "Fashion Editor",
    },
    {
      id: 2,
      title: "Sustainable Fashion: Why It Matters",
      excerpt:
        "Learn about the impact of fast fashion and how you can make more eco-friendly choices for your wardrobe.",
      date: "June 2, 2025",
      image: assets.p_img2_1,
      author: "Guest Contributor",
    },
    {
      id: 3,
      title: "How to Style Your Denim Jacket",
      excerpt:
        "A denim jacket is a versatile piece. Here are 5 ways to style it for different occasions.",
      date: "June 10, 2025",
      image: assets.p_img3,
      author: "Style Guru",
    },
  ];

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-8 text-center">
        <Title text1={"LATEST"} text2={"BLOGS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Stay updated with the latest fashion trends, tips, and news from our team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 px-4 sm:px-0">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{post.date} • {post.author}</p>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
              <button className="text-xs text-black font-semibold mt-3 hover:underline">READ MORE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
