import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 10,
    },

    welcome: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },

    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        fontSize: 16,
    },

    button: {
        width: "100%",
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
