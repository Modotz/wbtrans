// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView
} from 'react-native';

const DetailDataScreen = ({ navigation }: {navigation: any}) => {
    return (
        <View style={styles.container}>
            <Text>Detail Data Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});
export default DetailDataScreen;