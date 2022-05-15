import { Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import Loading from "../../../components/Loading/Loading";
import {
    HIGHER_POKE_IMAGE,
    LOWER_POKE_IMAGE,
} from "../../../constants/commons";
import { getPokemonInfo } from "../../../services/pokemon.services";
import { normalizeName, normalizeString } from "../../../utilities/normalize";
import { typeColors } from "../../../utilities/color";
import { abilities } from "../../../utilities/abilities";

const { width, height } = Dimensions.get("window");

export default function PokeActionSheet(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const { poke } = props;
    useEffect(() => {
        setLoading(true);
        getData();
    }, []);

    async function getData() {
        const data = await getPokemonInfo(poke.id);
        if (data) {
            setData(data);
        }
        setLoading(false);
    }

    if (loading)
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        );
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `${HIGHER_POKE_IMAGE}${poke.id}.gif` }}
                style={styles.image}
                resizeMode="contain"
            />
            <ScrollView>
                <View style={styles.scroll}>
                    <Text style={styles.text}>N° {poke.id}</Text>
                    <Text style={styles.text}>{normalizeName(poke.name)}</Text>
                    <View style={styles.typeView}>
                        {poke.types.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: typeColors[`${item}`],
                                        marginHorizontal: 4,
                                        padding: 4,
                                        borderRadius: 8,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={styles.normalText}>
                                        {normalizeName(item)}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    {data && (
                        <View
                            style={{
                                width: width,
                                alignItems: "center",
                                marginTop: 16,
                            }}
                        >
                            <Text style={[styles.text, { fontSize: 16 }]}>
                                Pokedex Entry
                            </Text>
                            <Text style={styles.normalText}>
                                {normalizeString(
                                    data.species.flavor_text_entries
                                )}
                            </Text>
                            <View
                                style={{ flexDirection: "row", marginTop: 16 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontSize: 16,
                                                alignSelf: "center",
                                            },
                                        ]}
                                    >
                                        Height
                                    </Text>
                                    <View style={styles.bgView}>
                                        <Text>
                                            {parseFloat(
                                                (data.pokemon.height * 10) / 100
                                            )}{" "}
                                            m{" "}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontSize: 16,
                                                alignSelf: "center",
                                            },
                                        ]}
                                    >
                                        Weight
                                    </Text>
                                    <View style={styles.bgView}>
                                        <Text>
                                            {data.pokemon.weight / 10} kg
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginTop: 16,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={[styles.text, { fontSize: 16 }]}>
                                    Abilities
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {data.pokemon.abilities.map(
                                        (item, index) => {
                                            return (
                                                <View
                                                    style={styles.bgView}
                                                    key={index}
                                                >
                                                    <Text>
                                                        {normalizeName(
                                                            item.ability.name
                                                        )}
                                                    </Text>
                                                </View>
                                            );
                                        }
                                    )}
                                </View>
                            </View>
                            <View
                                style={{
                                    marginTop: 16,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={[styles.text, { fontSize: 16 }]}>
                                    Stats
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {data.pokemon.stats.map((item, index) => {
                                        return (
                                            <View
                                                style={styles.bgView}
                                                key={index}
                                            >
                                                <Text
                                                    style={{ marginBottom: 4 }}
                                                >
                                                    {
                                                        abilities[
                                                            `${item.stat.name.replace(
                                                                "-",
                                                                ""
                                                            )}`
                                                        ]
                                                    }
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        { fontSize: 16 },
                                                    ]}
                                                >
                                                    {item.base_stat}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                    <View style={styles.bgView}>
                                        <Text style={{ marginBottom: 4 }}>
                                            {abilities[`total`]}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                { fontSize: 16 },
                                            ]}
                                        >
                                            {data.pokemon.stats.reduce(
                                                (prev, current) => {
                                                    if (
                                                        typeof prev === "object"
                                                    )
                                                        return (
                                                            prev.base_stat +
                                                            current.base_stat
                                                        );
                                                    return (
                                                        prev + current.base_stat
                                                    );
                                                }
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height * 0.8,
        alignItems: "center",
        marginTop: 16,
    },
    image: {
        width: width / 5,
        height: width / 5,
    },
    text: {
        fontFamily: "BillCorporateSemiBold",
        fontWeight: "bold",
        fontSize: 20,
    },
    typeView: {
        flexDirection: "row",
        marginTop: 2,
    },
    scroll: {
        alignItems: "center",
        marginTop: 16,
    },
    normalText: {
        fontFamily: "BillCorporate",
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 8,
    },
    bgView: {
        backgroundColor: "#E8F9FD",
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 16,
        flex: 1,
        marginHorizontal: 8,
    },
});
