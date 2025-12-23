import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FeedTabProps = {
  title: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function FeedTab({
  title,
  activeTab,
  setActiveTab,
}: FeedTabProps) {
  return (
    <TouchableOpacity
      style={styles.tabContainer}
      onPress={() => setActiveTab(title)}
    >
      <Text style={[styles.tabText, activeTab === title && styles.activeTab]}>
        {title}
      </Text>
      {activeTab === title && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    tabContainer: {
      alignItems:"center"
  },
  tabText: {
    color: "gray",
    fontWeight: 700,
    fontSize: 17,
  },
  activeTab: {
    color: "#ffffff",
  },
  activeDot: {
    width: 30,
    height: 2,
    backgroundColor: "#ffffff",
    marginTop: 4,
  },
});
