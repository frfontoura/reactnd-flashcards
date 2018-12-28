import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { blue, white } from '../../utils/colors'

export default class NewDeck extends Component {

    render() {
        const { deck } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.submit} style={styles.addCard} onPress={() => this.props.navigation.navigate('AddCard', { deck })}>
                        <Text style={styles.addCardText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.submit} style={styles.startQuiz} onPress={() => this.props.navigation.navigate('Quiz', { deck })}>
                        <Text style={styles.startQuizText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
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
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gray'
    },
    startQuiz: {
        height: 50,
        marginTop: 15,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startQuizText: {
        fontSize: 25,
        color: white
    },
    addCard: {
        height: 50,
        marginTop: 15,
        borderColor: blue,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addCardText: {
        fontSize: 25,
        color: blue
    }
})