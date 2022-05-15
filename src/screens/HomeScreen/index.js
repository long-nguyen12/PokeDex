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

const { width, height } = Dimensions.get("window");

export default function HomeScreen(props) {
    const [pokeList, setPokeList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadData();
    }, []);

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
            <CardPoke id={item.id} name={item.name} types={item.types}/>
        );
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
                    />
                </View>
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={pokeList}
                        renderItem={renderPoke}
                        numColumns={2}
                        keyExtractor={item => item.id}
                    />
                )}
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F9FD"
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
