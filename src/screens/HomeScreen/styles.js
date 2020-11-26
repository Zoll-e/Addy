import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        overflow:"scroll",
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        width:'90%',
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        marginRight: 5
    },
    button: {
        height: 45,
        borderRadius: 5,
        margin:5,
        backgroundColor: '#788eec',
        width: 100,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})
