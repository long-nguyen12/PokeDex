import { Text } from "@ui-kitten/components";
import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import {
    HIGHER_POKE_IMAGE,
    LOWER_POKE_IMAGE,
} from "../../../constants/commons";
import { typeColors } from "../../../utilities/color";
import { normalizeName } from "../../../utilities/normalize";

const { width, height } = Dimensions.get("window");

export default function CardPoke(props) {
    const { id, types, name } = props;
    return (
        <View style={styles.card}>
            <Image
                source={
                    id <= 650
                        ? { uri: `${LOWER_POKE_IMAGE}${id}.png` }
                        : { uri: `${HIGHER_POKE_IMAGE}${id}.png` }
                }
                style={styles.image}
            />
            <Text style={styles.text}>N° {id}</Text>
            <Text style={styles.text}>{normalizeName(name)}</Text>
            <View style={styles.typeView}>
                {types.map((item) => {
                    return (
                        <View
                            key={item}
                            style={{
                                backgroundColor: typeColors[`${item}`],
                                marginHorizontal: 4,
                                padding: 4,
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.text}>
                                {normalizeName(item)}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 8,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 8,
    },
    image: {
        width: width / 5,
        height: width / 5,
    },
    text: {
        fontFamily: "BillCorporateSemiBold",
        fontWeight: "bold",
        fontSize: 16,
    },
    typeView: {
        flexDirection: "row",
        marginTop: 2,
    },
});
