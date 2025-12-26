import { supabase } from "@/lib/supabase";
import { Post, PostInput } from "@/types/types";

type StoragePropsType = {
  fileName: string;
  fileExtension: string;
  fileBuffer: Uint8Array;
};
export const fetchPosts = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*,user:profiles(*),nrOfComments:comments(count)")
    .order("created_at", { ascending: false }) 
    .throwOnError();
  return data;
};


export const uploadVideoToStorage = async (storageProps: StoragePropsType) => {
  const { fileName, fileExtension, fileBuffer } = storageProps;

  const { data, error } = await supabase.storage
    .from("videos")
    .update(fileName, fileBuffer, {
      contentType: `video/${fileExtension}`,
    });
  if (error) {
    throw error;
  }

  const { data: urlData } = await supabase.storage
    .from("videos")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

export const createPost = async (newPost: PostInput) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(newPost)
    .throwOnError();
  if (error) {
    throw error;
  }
  return data;
};
