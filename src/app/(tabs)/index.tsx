import PostListItems from '@/components/PostListItems';
import { View, Text, FlatList } from 'react-native';
import posts from "@assets/data/posts.json";

export default function HomeScreen() {
    return (
        <View>
        <FlatList data={posts} renderItem={({ item }) => (
          <PostListItems postItem={item} />
          )} />
        </View>
    );
}