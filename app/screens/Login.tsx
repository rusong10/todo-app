import { useState } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Keyboard, StatusBar, } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInloading, setSignInLoading] = useState(false);
    const [signUploading, setSignUpLoading] = useState(false);

    const signIn = async () => {
        setSignInLoading(true);
        Keyboard.dismiss();

        try {
            const response = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );
        } catch (e: any) {
            alert("Sign in failed: " + e.message);
        } finally {
            setSignInLoading(false);
        }
    };

    const signUp = async () => {
        setSignUpLoading(true);
        Keyboard.dismiss();

        try {
            const response = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );

            alert("Check your emails");
        } catch (e: any) {
            alert("Sign up failed: " + e.message);
        } finally {
            setSignUpLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, }}>
            <StatusBar animated translucent backgroundColor={'transparent'} barStyle={'dark-content'} />

            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', marginHorizontal: 20 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text: string) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholderTextColor={'#c7c7cd'}
                    numberOfLines={1}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text: string) => setPassword(text)}
                    value={password}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={'#c7c7cd'}
                    numberOfLines={1}
                />

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={signIn} style={styles.signIn}>
                        {
                            signInloading ?
                                <ActivityIndicator size={'small'} color={"white"} />

                                :
                                <Text style={styles.signInText}>Sign in</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={signUp} style={styles.signOut}>
                        {
                            signUploading ?
                                <ActivityIndicator size={'small'} color={"#c7c7cd"} />
                                :
                                <Text style={styles.signOutText}>Create account</Text>
                        }
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    input: {
        marginVertical: 4,
        color: '#757575',
        borderWidth: 1,
        borderColor: '#c7c7cd',
        borderRadius: 5,
        padding: 10,
        backgroundColor: "white",
    },

    signIn: {
        marginVertical: 4,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#6aa3f9",
        borderWidth: 1,
        borderColor: '#6aa3f9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    signOut: {
        marginVertical: 4,
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#c7c7cd',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },

    signInText: {
        color: 'white'
    },

    signOutText: {
        color: '#757575'
    }
});
