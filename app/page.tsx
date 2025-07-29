import AuthButton from "@/components/auth-button";
import PostCards from "@/components/PostCards";
import { Button } from "@/components/ui/button";
import { dummyPosts } from "@/dummy-post";
import { PlusCircle } from "lucide-react";
import Link from "next/link"; // ✅ Correct Link import for Next.js

export default function Home() {
  const isAdmin = true; // Replace with actual admin check logic
  const posts = dummyPosts
  const loading = false

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Simple Blog
          </Link>

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Button asChild>
                <Link href="/admin/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </Button>
            )}
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Simple Blog</h1>
            <p className="text-muted-foreground">
              A clean, functional blog focused on great content
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading Post...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No post yet. {isAdmin && "Create your first post!"}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCards key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
