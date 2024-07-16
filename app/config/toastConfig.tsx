import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { AntDesign } from '@expo/vector-icons';

interface ShortInfoProps {
    message: string;
}

export const toastConfig = {
    empty: () => <></>,
    shortInfo: ({ props, ...rest }: { props: ShortInfoProps }) => (
        <View
            style={{
                marginHorizontal: 15,
                paddingHorizontal: 20,
                paddingVertical: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(55, 55, 55, 0.95)",
                borderRadius: 10,
                flexDirection: "row",
            }}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: "white" }}>
                    {props.message}
                </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => Toast.hide()}>
                <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
        </View>
    )
};