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
import { useCallback, useEffect } from "react";
import { Post } from "@/types/types";

type videoItemProps = {
  postItem: Post
  isActive:boolean
  }

export default function PostListItems({postItem,isActive}:videoItemProps) {
  const { height } = Dimensions.get("window");

  const player = useVideoPlayer(postItem?.video_url, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(
    useCallback(() => {
      if (!player) return;

      try {
        if (isActive) {
          player.play();
        } else {
          player.pause()
        }
      } catch (error) {
        console.error("Playback error:", error);
      }
      
      return () => {
        if (player && !isActive) {
          try {
            player.pause();
          } catch (error) {
            console.error("Pause error:", error);
          }
        }
      };
    }, [player, isActive]), 
  );
  

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
            {postItem?.nrOfLikes[0]?.count}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => console.log("Comment Pressed")}
        >
          <FontAwesome name="comment" size={24} color="#ffffff" />
          <Text style={styles.interationText}>
            {postItem?.nrOfComments[0]?.count}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => console.log("Share pressed")}
        >
          <FontAwesome name="share" size={24} color="#ffffff" />
          <Text style={styles.interationText}>{postItem?.nrOfShares[0]?.count}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => console.log("profile pressed")}
        >
          <Text style={styles.avatarText}>{postItem?.user?.username?.charAt(0).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.username}>{postItem?.user?.username}</Text>
        <Text style={styles.description}>{postItem?.description}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  interactionBar: {
    position: "absolute",
    right: 20, 
    bottom: 50,
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
    color: "#ffffff",
    bottom:30
  },
  description: {
    color: "#ffffff",
    bottom:30
  }
});
