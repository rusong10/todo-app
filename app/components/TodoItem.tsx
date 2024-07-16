import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FIREBASE_DB } from "../../firebaseConfig";
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOut, LinearTransition } from "react-native-reanimated";

const TodoItem = ({ item }: any) => {
    const ref = doc(FIREBASE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
        updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
        deleteDoc(ref);
    };

    return (
        <Animated.View
            layout={LinearTransition.duration(300)}
            entering={FadeInRight.duration(300)}
            exiting={FadeOut.duration(300)}
            style={styles.todoContainer}
        >
            <TouchableOpacity activeOpacity={0.7} onPress={toggleDone} style={styles.todo}>
                {
                    item.done &&
                    <FontAwesome name="check-circle" size={24} color="#34C759" />
                }
                {
                    !item.done &&
                    <FontAwesome name="circle-thin" size={24} color="#3C3C43" />
                }

                <Text style={styles.todoText}>{item.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={deleteItem} style={styles.delete}>
                <FontAwesome name="trash-o" size={18} color="#FF3B30" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TodoItem;

const styles = StyleSheet.create({
    todoContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginVertical: 2,
        marginHorizontal: 5,
        borderRadius: 5,
    },

    todo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingLeft: 15,
    },

    todoText: {
        flex: 1,
        marginHorizontal: 10,
        color: '#3C3C43'
    },

    delete: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    }
});
