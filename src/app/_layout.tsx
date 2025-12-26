import { Stack } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { LogBox } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

LogBox.ignoreAllLogs();




export default function RootLayout() {
    const queryClient = new QueryClient();
    const myTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: "white",
        },
    }
    return (
      <ThemeProvider value={myTheme}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </ThemeProvider>
    );
}