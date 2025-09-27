import { Link } from "wouter";
import { useSEO, createBreadcrumbSchema } from "@/hooks/use-seo";

// Dummy data for blog posts
const blogPosts = [
  {
    slug: "first-post",
    title: "My First Blog Post",
    description: "This is a short summary of my first blog post. It's about something interesting.",
    date: "September 27, 2025",
  },
  {
    slug: "second-post",
    title: "Another Interesting Post",
    description: "Here is another post that delves into a different topic, with more details.",
    date: "September 28, 2025",
  },
];

export default function Blog() {
  useSEO({
    title: "Blog - Jacob Darling",
    description: "A collection of articles and thoughts on marketing, technology, and more.",
    canonical: "https://jacobdarling.com/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", url: "https://jacobdarling.com" },
          { name: "Blog", url: "https://jacobdarling.com/blog" }
        ])
      ]
    }
  });

  return (
    <section className="py-16 bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Blog
          </h1>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div key={post.slug} className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">{post.date}</p>
                <p className="text-lg text-foreground leading-relaxed mb-4">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-primary font-semibold hover:underline">
                  Read more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
