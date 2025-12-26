import PostListItems from "@/components/PostListItems";
import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import FeedTab from "@/components/FeedTab";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/posts";

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height } = Dimensions.get("window");
  const isFocused = useIsFocused();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const Tabs = {
    explore: "Explore",
    following: "Following",
    for_you: "For you",
  };
  const [activeTab, setActiveTab] = useState(Tabs.for_you);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  );

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "red" }}>
          Error Occured while fetching post request
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleRefresh}>
          <Feather name="refresh-cw" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.navigationBar}>
          <FeedTab
            title={Tabs.explore}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <FeedTab
            title={Tabs.following}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <FeedTab
            title={Tabs.for_you}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </View>

        <TouchableOpacity>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data || []}
        renderItem={({ item, index }) => (
          <PostListItems
            postItem={item}
            isActive={isFocused && index === currentIndex}
          />
        )}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 70}
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
    top: 50,
    paddingHorizontal: 20,
  },
  navigationBar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    gap: 30,
  },
});
