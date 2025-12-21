import { Stack } from "expo-router";
import {ThemeProvider,DarkTheme,DefaultTheme} from "@react-navigation/native";


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