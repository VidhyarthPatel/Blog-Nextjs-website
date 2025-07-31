// components/PostCards.tsx
'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MarkdownRenderer from "./markdownRanderer";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

export default function PostCards({ post }: { post: Post }) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(post._count.likes);
  const [likedLoading, setLikedLoading] = useState(true);

  // Fetch like status when session or post changes
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!session?.user.id) {
        setLikedLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/posts/${post.id}/like`);
        if (response.ok) {
          const data = await response.json();
          setLiked(data.liked);
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      } finally {
        setLikedLoading(false);
      }
    };
    fetchLikeStatus();
  }, [session, post.id]);

  const handleLike = async () => {
  if (!session) return;

  setLiked(prev => !prev);
  setLikedCount(prev => (liked ? Math.max(prev - 1, 0) : prev + 1));

  try {
    await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
  } catch (error) {
    console.error("Error liking post:", error);
  }
};


  const content =
    post.content.slice(0, 200) + (post.content.length > 200 ? "..." : "");

  return (
    <Card className="max-w-3xl mx-auto my-4 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.image || ""} />
            <AvatarFallback>{post.author.name?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <CardTitle className="mt-2 text-lg font-semibold">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MarkdownRenderer content={content} />
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <Button
          className="flex items-center space-x-2"
          variant={"ghost"}
          size={"sm"}
          onClick={handleLike}
          disabled={!session}
        >
          <Heart
            className={`h-4 w-4 ${
              likedLoading
                ? "animate-pulse"
                : liked
                ? "fill-red-500 text-red-500"
                : ""
            }`}
          />
          <span>{likedCount}</span>
        </Button>
        <Button
          className="flex items-center space-x-2"
          variant={"ghost"}
          size={"sm"}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post._count.comments}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
