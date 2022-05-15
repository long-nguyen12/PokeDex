import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import HomeScreen from "./src/screens/HomeScreen";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";

export default function App() {
    let [fontsLoaded] = useFonts({
        BillCorporate: require("./assets/fonts/bill_corporate_narrow.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <>
            <StatusBar hidden />
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <HomeScreen />
            </ApplicationProvider>
        </>
    );
}
