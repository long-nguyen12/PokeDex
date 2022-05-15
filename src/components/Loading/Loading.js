import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Image } from "react-native";

const size = 40;
const innerSize = size / 2;

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.animation = new Animated.Value(0);
    }

    componentDidMount = () => {
        Animated.loop(
            Animated.timing(this.animation, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };
    render() {
        const Dim = size;
        const outerAngle = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        });

        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        width: Dim,
                        height: Dim,
                        transform: [{ rotate: outerAngle }],
                    }}
                >
                    <Animated.View
                        style={{
                            ...styles.item,
                        }}
                    >
                        <Image
                            source={require("../../assets/pokeball-icon.png")}
                            style={{ width: 40, height: 40 }}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        width: size,
        height: size,
        borderWidth: 0,
        backgroundColor: "transparent",
        position: "absolute",
        justifyContent: "center",
    },
    innerItem: {
        height: innerSize / 10,
        width: innerSize,
    },
});
