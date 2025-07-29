import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";

export default function PostCards({ post }) {
  const likeLoading = true; // Replace with actual loading state
  const liked = true; // Replace with actual liked state
  return (
    <div>
      <Card className="max-w-3xl mx-auto my-4 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post.author.image || ""} />
              <AvatarFallback>
                {post.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
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
        <CardFooter className="flex items-center space-x-4">
            <Button
            className="flex items-center space-x-2"
            variant={"ghost"}
            size={"sm"}
            >
            <Heart
              className={`h-4 w-4 ${
              likeLoading
                ? "animate-pulse"
                : liked
                ? "fill-red-500 text-red-500"
                : ""
              }`}
            />
            <span>{post._count.likes}</span>
            </Button>
          <Button
            className="flex items-center space-x-2"
            variant={"ghost"}
            size={"sm"}
          >
            <MessageCircle className="h-4 w-4"/>
            <span>{post._count.comments}</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
