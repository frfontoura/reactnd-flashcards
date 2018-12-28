import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity  } from 'react-native'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { blue, white } from '../../utils/colors'

import { Creators as DeckActions } from '../../store/ducks/deck'
import { submitEntry } from '../../utils/api'

class NewDeck extends Component {
    static navigationOptions = {
        drawerLabel: 'Create Deck'
    }

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    submit = () => {
        const { text } = this.state

        if(!text) {
            return
        }

        const deck = {
            title: text,
            questions: []
        }

        this.props.saveDeck(deck)
        submitEntry(deck)
        this.props.navigation.navigate('DeckDetail', { deck })
        this.setState({ ...this.state, text: '' })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.question}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder={`Deck's Title`}
                />
                <TouchableOpacity onPress={this.submit} style={styles.submit}>
                    <Text style={styles.submitText}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    question: {
        fontSize: 40,
        textAlign: 'center'
    },
    input: {
        height: 40,
        marginTop: 15,
        fontSize: 25,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5
    },
    submit: {
        height: 50,
        marginTop: 15,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        fontSize: 25,
        color: white
    }
})

const mapDispatchToProps = dispatch => bindActionCreators(DeckActions, dispatch)

export default connect(null, mapDispatchToProps)(NewDeck)