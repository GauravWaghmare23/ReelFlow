import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Post } from "@/types/types";

type videoItemProps = {
    postItem:Post
  }

export default function PostListItems({postItem}:videoItemProps) {
  const { height } = Dimensions.get("window");

  const player = useVideoPlayer(postItem.video_url, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={{ height: height - 70 }}>
      <VideoView
        style={{ flex: 1 }}
        player={player}
        contentFit="cover"
        nativeControls={false}
      />
      <View style={styles.interactionBar}>
        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => console.log("Like Pressed")}
        >
          <FontAwesome name="heart" size={24} color="#ffffff" />
          <Text style={styles.interationText}>
            {postItem.nrOfLikes[0]?.count}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => console.log("Comment Pressed")}
        >
          <FontAwesome name="comment" size={24} color="#ffffff" />
          <Text style={styles.interationText}>
            {postItem.nrOfComments[0].count}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => console.log("Share pressed")}
        >
          <FontAwesome name="share" size={24} color="#ffffff" />
          <Text style={styles.interationText}>{postItem.nrOfShares[0].count}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => console.log("profile pressed")}
        >
          <Text style={styles.avatarText}>{postItem.user.id}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.username}>{postItem.user.username}</Text>
        <Text style={styles.description}>{postItem.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interactionBar: {
    position: "absolute",
    right: 20,
    bottom: 20,
    gap:25
  },
  interactionItem: {
    alignItems:"center",
    gap:5
  },
  interationText: {
    color:"#ffffff",
    fontSize: 15,
    fontWeight: "bold"
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor:"#ffffff",
    borderRadius:20,
    alignItems:"center",
    justifyContent: "center"
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  videoInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right:80,
    gap:10,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color:"#ffffff"
  },
  description: {
    color:"#ffffff"
  }
});
