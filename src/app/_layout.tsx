import { Stack } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();




export default function RootLayout() {
    const myTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: "white",
        },
    }
    return (
        <ThemeProvider value={myTheme}>
            <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    );
}