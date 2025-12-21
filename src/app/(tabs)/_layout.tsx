import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="friends"
                options={{
                    title: "Friends",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="users" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="newPost"
                options={{
                    title: "New Post",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="plus" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: "Inbox",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="mail" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
