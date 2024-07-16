import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function AddBar() {
    const [input, setInput] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const user: User | null = FIREBASE_AUTH.currentUser;
    const addItem = async () => {
        Keyboard.dismiss();

        if (user && input.trim()) {
            setLoading(true);

            await addDoc(collection(FIREBASE_DB, "todos"), {
                title: input.trim(),
                done: false,
                uid: user.uid,
                createdDate: Timestamp.now(),
            });
        }

        setInput('');
        setLoading(false);

        Toast.show({
            type: 'shortInfo',
            props: {
                message: 'Added'
            },
            position: 'bottom',
            visibilityTime: 1500,
            autoHide: true
        })
    };

    return (
        <View style={styles.container}>
            <TextInput
                multiline
                value={input}
                placeholder='Add item'
                style={styles.input}
                onChangeText={(input) => setInput(input)}
                onSubmitEditing={addItem}
                placeholderTextColor='#8E8E93'
                selectionColor={'#94bbff'}
            />

            <TouchableOpacity activeOpacity={0.7} onPress={addItem} style={styles.addButton}>
                {
                    loading ?
                        <ActivityIndicator size={'small'} color={'white'} />
                        :
                        <Feather name="plus" size={24} color="white" />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 10,
        color: '#3C3C43'
    },

    addButton: {
        flex: 0.15,
        backgroundColor: '#6aa3f9',
        // paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        alignSelf: 'stretch',
    }
})