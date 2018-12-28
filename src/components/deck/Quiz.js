import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class NewDeck extends Component {
    render() {
        const { deck } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text>{deck.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'stretch',
        justifyContent: 'space-around'
    }
})