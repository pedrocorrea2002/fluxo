import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Incomings } from '../pages/incomings';
import { Outcomings } from '../pages/outcomings';
import { Main } from '../pages/main';
import { Extract } from '../pages/Views/extract_geral';
import { Extract_categoria } from '../pages/Views/total_categoria';
import { Chart_screen } from '../pages/Views/chart_screen';

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
                    component={Extract}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Extract_categoria"
                    component={Extract_categoria}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chart_screen"
                    component={Chart_screen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator