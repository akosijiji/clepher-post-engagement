import { createContext } from "react";
import PostData from "../types/PostData";

export interface PostsContextData {
  posts: PostData[];
  filteredPosts: PostData[];
}
 
export const postsContextDefaultValue: PostsContextData = {
  posts: [],
  filteredPosts: [],
}
 
export const PostsContext = createContext<PostsContextData>(postsContextDefaultValue);