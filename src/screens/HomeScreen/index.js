import { Icon, Input, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../components/Loading/Loading";
import { getPokemonList } from "../../services/pokemon.services";
import CardPoke from "./components/CardPoke";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { POKE_ACTIONSHEET } from "../../constants/commons";
import PokeActionSheet from "./components/ActionSheet";

const { width, height } = Dimensions.get("window");

export default function HomeScreen(props) {
    const [pokeList, setPokeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPoke, setSelectedPoke] = useState(null);
    const [pokeName, setPokeName] = useState("");
    const [filterPoke, setFilterPoke] = useState([]);

    useEffect(() => {
        setLoading(true);
        loadData();
    }, []);

    function showActionSheet(item) {
        SheetManager.show(POKE_ACTIONSHEET);
        setSelectedPoke(item);
    }

    function hideActionSheet() {
        SheetManager.hideAll();
    }

    async function loadData() {
        const data = await getPokemonList();
        setPokeList(data);
        setLoading(false);
    }

    function renderSearchIcon(props) {
        return (
            <TouchableOpacity>
                <Icon {...props} name="search" />
            </TouchableOpacity>
        );
    }

    function renderPoke({ item }) {
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => showActionSheet(item)}
            >
                <CardPoke id={item.id} name={item.name} types={item.types} />
            </TouchableOpacity>
        );
    }

    function searchPoke(value) {
        setPokeName(value);
        const data = pokeList.filter((item) => {
            return item.name.includes(pokeName);
        });
        setFilterPoke(data);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../../assets/pokeball-icon.png")}
                imageStyle={styles.backgroundImage}
                style={styles.container}
            >
                <View style={styles.searchArea}>
                    <Input
                        style={styles.searchBox}
                        placeholder="Search your Pokemon"
                        accessoryRight={renderSearchIcon}
                        onChangeText={(value) => searchPoke(value)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={pokeName ? filterPoke : pokeList}
                        renderItem={renderPoke}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </ImageBackground>
            <ActionSheet id={POKE_ACTIONSHEET}>
                {selectedPoke && <PokeActionSheet poke={selectedPoke} />}
            </ActionSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F9FD",
    },
    backgroundImage: {
        width: width,
        height: width,
        marginTop: -width / 5,
        marginLeft: -width / 3,
    },
    text: {
        fontFamily: "BillCorporate",
    },
    searchBox: {
        width: width - 20,
        backgroundColor: "#fff",
        fontFamily: "BillCorporate",
    },
    searchArea: {
        alignItems: "center",
        marginTop: 16,
    },
});
