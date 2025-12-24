import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  LogBox,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useVideoPlayer, VideoView } from "expo-video";
import * as ImagePicker from "expo-image-picker";

LogBox.ignoreAllLogs();

export default function NewPostScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const player = useVideoPlayer(videoUri ? { uri: videoUri } : null, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    const run = async () => {
      try {
        if (videoUri) {
          await player.play();
        } else {
          await player.pause();
        }
      } catch (e) {
        console.log("play/pause error", e);
      }
    };
    run();
  }, [videoUri, player]);

  useEffect(() => {
    if (
      (permission && !permission.granted && permission.canAskAgain) ||
      (micPermission && !micPermission.granted && micPermission.canAskAgain)
    ) {
      requestPermission();
      requestMicPermission();
    }
  }, [permission, micPermission, requestPermission, requestMicPermission]);

  if (!permission || !micPermission) {
    return <View style={styles.container} />;
  }

  if (
    (permission && !permission.granted && !permission.canAskAgain) ||
    (micPermission && !micPermission.granted && !micPermission.canAskAgain)
  ) {
    return (
      <View style={styles.PermissionContainer}>
        <Text style={styles.permissionText}>
          We need permission to use your camera and microphone
        </Text>
        <TouchableOpacity
          style={styles.PermissionButton}
          onPress={() => Linking.openSettings()}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const selectFrontGallery = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access the media library is required.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        setVideoUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log("picker error", e);
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);
      const recorded = await cameraRef.current.recordAsync();
      if (recorded?.uri) {
        setVideoUri(recorded.uri);
      }
    } catch (e) {
      console.error("Record error", e);
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!cameraRef.current || !isRecording) return;
    try {
      cameraRef.current.stopRecording();
    } catch (e) {
      console.error("Stop record error", e);
    }
  };

  const dismissVideo = () => {
    setVideoUri(null);
    setDescription("");
  };

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      {isRecording && <Text style={styles.recordingText}>recording</Text>}

      <View style={styles.topBar}>
        <Entypo name="cross" size={30} color="white" />
      </View>

      <CameraView
        mode="video"
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
      />

      <View style={styles.bottomControls}>
        <Entypo
          name="images"
          size={40}
          color="white"
          onPress={selectFrontGallery}
        />

        <TouchableOpacity
          style={isRecording ? styles.recordingButton : styles.recordButton}
          onPress={isRecording ? stopRecording : startRecording}
        />

        <FontAwesome6
          name="camera-rotate"
          size={40}
          color="white"
          onPress={toggleCameraFacing}
        />
      </View>
    </View>
  );

  const renderRecordedVideo = () => (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.closeIcon} onPress={dismissVideo}>
        <MaterialIcons name="cancel" size={30} color="white" />
      </TouchableOpacity>

      {videoUri && (
        <VideoView
          style={styles.video}
          player={player}
          contentFit="cover"
          nativeControls
        />
      )}

      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter the description..."
          placeholderTextColor="#aaaaaa"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.postButtonContainer}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() =>
              console.log("Post button pressed", { videoUri, description })
            }
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  return videoUri ? renderRecordedVideo() : renderCamera();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
  PermissionButton: {
    backgroundColor: "#ff3b5c",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  PermissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "black",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  recordButton: {
    height: 80,
    width: 80,
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  recordingButton: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: "#f44336",
  },
  recordingText: {
    position: "absolute",
    color: "white",
    zIndex: 12,
    top: 50,
    left: 160,
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    fontWeight: "bold",
  },
  topBar: {
    position: "absolute",
    zIndex: 12,
    top: 50,
    left: 10,
  },
  bottomControls: {
    position: "absolute",
    flexDirection: "row",
    bottom: 40,
    paddingHorizontal: 20,
    gap: 90,
    alignItems: "center",
    width: "100%",
  },
  closeIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  video: {
    flex: 1,
    marginTop: 80,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  input: {
    minHeight: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "white",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  postButtonContainer: {
    padding: 16,
  },
  postButton: {
    backgroundColor: "#ff3b5c",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
