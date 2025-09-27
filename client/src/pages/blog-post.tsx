import { useRoute } from "wouter";
import { useSEO, createBreadcrumbSchema } from "@/hooks/use-seo";
import { Link } from "wouter";

// Dummy content for a blog post
const postContent = {
  title: "My First Blog Post",
  date: "September 27, 2025",
  content: `
    <p>This is the full content of the first blog post. It's written in HTML and can be rendered directly.</p>
    <p>You can use <strong>strong</strong>, <em>emphasis</em>, and other HTML tags here.</p>
    <pre><code>// This is a code block
function helloWorld() {
  console.log("Hello, world!");
}</code></pre>
    <blockquote>This is a blockquote.</blockquote>
  `,
};

export default function BlogPost() {
  const [,, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  useSEO({
    title: `${postContent.title} - Jacob Darling's Blog`,
    description: `Read the article titled ${postContent.title}.`,
    canonical: `https://jacobdarling.com/blog/${slug}`,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", url: "https://jacobdarling.com" },
          { name: "Blog", url: "https://jacobdarling.com/blog" },
          { name: postContent.title, url: `https://jacobdarling.com/blog/${slug}` }
        ])
      ]
    }
  });

  return (
    <section className="py-16 bg-background pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{postContent.title}</h1>
            <p className="text-muted-foreground">{postContent.date}</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">&larr; Back to Blog</Link>
          </header>
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: postContent.content }}
          />
        </article>
      </div>
    </section>
  );
}
