import PostListItems from "@/components/PostListItems";
import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import posts from "@assets/data/posts.json";
import { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import FeedTab from "@/components/FeedTab";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height } = Dimensions.get("window");
  const isFocused = useIsFocused();

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
    },
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Feather name="tv" size={24} color="white" />
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
        data={posts}
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
