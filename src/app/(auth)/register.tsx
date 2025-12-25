import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const register = useAuthStore((state) => state.register);

  const handleRegister = async () => {
    try {
      if (!username || !email || !password) {
        Alert.alert("Error :", "Please enter username, email and password");
      }

      setLoading(true);
      await register(email, password, username);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error :", "Registration failed, Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subTitle}>Sign up to get Started</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666666"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={loading ? styles.loading : styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "loading..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      <View style={styles.linkView}>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <Link href={"/login"}>
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 5,
  },
  subTitle: {
    color: "#999999",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 20,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#ff0050",
    padding: 13,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 35,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  bottomText: {
    color: "#999999",
    textAlign: "center",
    fontSize: 15,
  },
  linkText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  loading: {
    backgroundColor: "#999999",
    padding: 13,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 35,
  },
});
