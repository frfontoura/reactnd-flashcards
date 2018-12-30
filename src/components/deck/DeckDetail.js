import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { blue, white, red } from '../../utils/colors'
import { Creators as DeckActions } from '../../store/ducks/deck'
import { removeEntry } from '../../utils/api'

class DeckDetail extends Component {

    confirmDelete = () => {
        Alert.alert(
            'Delete Deck',
            'Are you sure you want to delete the deck?',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: this.deleteDeck },
            ],
            { cancelable: true }
          )
    }

    deleteDeck = () => {
        const { deck } = this.props.navigation.state.params
        this.props.deleteDeck(deck.title)
        this.props.navigation.navigate('DeckList')
        removeEntry(deck.title)
    }

    render() {
        const { deck } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.addCard} onPress={() => this.props.navigation.navigate('AddCard', { deck })}>
                        <Text style={styles.addCardText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startQuiz} onPress={() => this.props.navigation.navigate('Quiz', { deck })}>
                        <Text style={styles.startQuizText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={this.confirmDelete}>
                    <FontAwesome name='trash-o' size={30} color={red} />
                </TouchableOpacity>
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
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addCardText: {
        fontSize: 25,
        color: blue
    },
    deleteButton: {
        alignSelf: 'flex-end'
    }
})

const mapDispatchToProps = dispatch => bindActionCreators(DeckActions, dispatch)

export default connect(null, mapDispatchToProps)(DeckDetail)