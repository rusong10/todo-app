import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import { toastConfig } from "./app/config/toastConfig";

//screens
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function App() {
    const [authorized, setAuthorized] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setAuthorized(user);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                <ActivityIndicator size={"large"} color='#6aa3f9' />
            </View>
        );
    }

    const Stack = createNativeStackNavigator();

    return (
        <KeyboardProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {
                        authorized ?
                            <Stack.Screen
                                name="Todos List"
                                component={Home}
                                options={{
                                    headerTitleStyle: {
                                        fontWeight: 'bold'
                                    }
                                }}
                            />
                            :
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                    }
                </Stack.Navigator>
            </NavigationContainer>
            <Toast config={toastConfig} />
        </KeyboardProvider>
    );
}
