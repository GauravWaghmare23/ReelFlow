import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function ProfileScreen() {

  const [loading,setLoading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          await logout();
          setLoading(false);
        },
      }
    ])
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      <View style={styles.profile}>
        <Text style={{ color: "black", fontSize: 50 }}>
          {user?.username.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:25
  },
  headerText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 5,
  },
  profile: {
    height: 100,
    width: 100,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50
  },
  name: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 40
  },
  email: {
    color: "#666666",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    marginBottom:50
  },
  button: {
    backgroundColor: "#ff0050",
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText:{
    color:"white"
  }
})