import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Extract_categoria } from '../pages/Views/total_categoria';
import { Incomings } from '../pages/incomings';
import { Outcomings } from '../pages/outcomings';
import { Main } from '../pages/main';

function Navigator() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Main'
            >
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Incomings"
                    component={Incomings}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Outcomings"
                    component={Outcomings}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Extract"
                    component={Extract_categoria}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator