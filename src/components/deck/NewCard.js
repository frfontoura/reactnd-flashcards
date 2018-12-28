import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { blue, white } from '../../utils/colors'
import { Creators as DeckActions } from '../../store/ducks/deck'
import { submitEntry } from '../../utils/api'

class NewCard extends Component {

    constructor(props) {
        super(props);
        this.state = { question: '', answer: '' };
    }

    submit = () => {
        const { deck } = this.props.navigation.state.params

        deck.questions.push({
            question: this.state.question,
            answer: this.state.answer
        })

        this.props.saveDeck(deck)
        this.props.navigation.navigate('DeckDetail', { deck })
        submitEntry(deck)
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <TextInput
                    style={styles.input}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                    placeholder='Question'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={this.state.answer}
                    placeholder='Answer'
                />
                <TouchableOpacity onPress={this.submit} style={styles.submit}>
                    <Text style={styles.submitText}>Create Card</Text>
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

export default connect(null, mapDispatchToProps)(NewCard)