import { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { collection, onSnapshot, orderBy, query, where, } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { ReactNativeModal } from 'react-native-modal';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import TodoItem from '../components/TodoItem';
import AddBar from '../components/AddBar';

export interface Todo {
    id: string;
    title: string;
    done: boolean;
}

const Home = ({ navigation }: any) => {
    const user = FIREBASE_AUTH.currentUser;
    const dimension = Dimensions.get('screen');

    const [todoList, setTodoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialIcons
                    name="logout"
                    size={24}
                    color="#6aa3f9"
                    onPress={() => setLogoutModal(true)}
                />
            )
        })
    }, [navigation])

    useEffect(() => {
        if (user) {
            const todoRef = collection(FIREBASE_DB, "todos");
            const q = query(
                todoRef,
                where("uid", "==", user.uid),
                orderBy("createdDate")
            );

            const subscriber = onSnapshot(q, {
                next: (snapshot) => {
                    console.log("UPDATED");

                    const todos: any[] = [];

                    snapshot.docs.forEach((doc) => {
                        todos.push({
                            id: doc.id,
                            ...doc.data(),
                        } as Todo);
                    });

                    setTodoList(todos);
                    setLoading(false);
                },
            });

            return () => subscriber();
        }
    }, []);

    if (loading) {
        return (
            <ActivityIndicator size={'large'} color='#6aa3f9' style={{ flex: 1, justifyContent: "center", alignItems: "center", }} />
        )
    }

    const handleLogout = () => {
        setLogoutLoading(true);

        FIREBASE_AUTH.signOut()
            .then(() => {
                Toast.show({
                    type: 'shortInfo',
                    props: {
                        message: 'Logged out'
                    },
                    position: 'bottom',
                    visibilityTime: 1500,
                    autoHide: true
                })
            })
            .catch((error) => {
                console.error('Sign out error', error);
            });

        setLogoutLoading(false);
    }

    return (
        <>
            <StatusBar animated backgroundColor={'white'} barStyle={'dark-content'} />
            <AddBar />
            <FlatList
                keyExtractor={(item) => item.id}
                data={todoList}
                renderItem={({ item }) => <TodoItem item={item} />}
                contentContainerStyle={{ paddingBottom: 10 }}
            />

            <ReactNativeModal
                isVisible={logoutModal}
                backdropOpacity={0.6}
                onBackdropPress={() => setLogoutModal(false)}
                useNativeDriver={Platform.select({ android: true, ios: false })}
                statusBarTranslucent
                deviceHeight={dimension.height}
            >
                <View style={styles.modalContainer}>
                    <AntDesign name="warning" size={24} color="#FF3B30" />
                    <Text style={styles.modalTile}>Are you sure you want to log out?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setLogoutModal(false)} activeOpacity={0.7} style={styles.negativeButton}>
                            <Text style={{ color: '#FF3B30' }}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7} style={styles.positiveButton}>
                            <Text style={{ color: 'white' }}>{logoutLoading ? <ActivityIndicator size={'small'} color={'white'} /> : 'Yes'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalTile: {
        color: '#3C3C43',
        marginVertical: 10,
        paddingBottom: 20
    },

    negativeButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF3B30',
        marginRight: 2.5
    },

    positiveButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FF3B30',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2.5
    }
})