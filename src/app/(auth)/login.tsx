import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error :", "Please enter email and password");
        return;
      }
      setLoading(true);
      await login(email, password);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error :", "Login failed, Please try again later.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subTitle}>Sign in to your account</Text>
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
      <TouchableOpacity style={loading ? styles.loading : styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign In"}</Text>
      </TouchableOpacity>

      <View style={styles.linkView}>
        <Text style={styles.bottomText}>Don't have an account?</Text>
        <Link href={"/register"}>
          <Text style={styles.linkText}>Sign Up</Text>
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
