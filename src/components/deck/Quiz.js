import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { red, gray, blue, green, white } from '../../utils/colors'
import If from '../../utils/if'

const INITIAL_STATE = { showAnswer: false, questionNumber: 0, correct: 0, answered: false, hasNext: true }

export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount() {
        const { deck } = this.props.navigation.state.params
        if (deck.questions.length === 0) {
            Alert.alert(
                'Empty Deck',
                'There are no questions in this deck',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('DeckDetail', { deck }) },
                ],
                { cancelable: false }
            )
            return
        }

        if (deck.questions.length === 1) {
            this.setState({ ...this.state, hasNext: false })
        }
    }

    nextQuestion = () => {
        const { deck } = this.props.navigation.state.params
        const nextQuestionNumber = this.state.questionNumber + 1
        const hasNext = (nextQuestionNumber + 1) < deck.questions.length

        if (nextQuestionNumber < deck.questions.length) {
            this.setState({ ...this.state, questionNumber: nextQuestionNumber, showAnswer: false, answered: false, hasNext: hasNext })
        }
    }

    restart = () => {
        Alert.alert(
            'Restart Quiz',
            'Do you want to restart the quiz?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.setState(INITIAL_STATE) },
            ],
            { cancelable: true }
        )
    }

    showAnswer = () => {
        this.setState({ ...this.state, showAnswer: true })
    }

    correctAnswer = () => {
        if (!this.state.answered) {
            this.setState({ ...this.state, correct: this.state.correct + 1, answered: true })
        }
    }

    incorrectAnswer = () => {
        if (!this.state.answered) {
            this.setState({ ...this.state, answered: true })
        }
    }

    render() {
        const { deck } = this.props.navigation.state.params
        const question = deck.questions[this.state.questionNumber];
        const finished = (this.state.questionNumber + 1) === deck.questions.length && this.state.answered

        return (
            <View style={styles.container}>
                <If test={!finished}>
                    <View style={{ flex: 1 }}>
                        <Text>{this.state.questionNumber + 1}/{deck.questions.length}</Text>
                        <Text style={[styles.textCenter, styles.question]}>{question.question}</Text>

                        {(this.state.showAnswer) ?
                            <Text style={[styles.textCenter, styles.answer]}>{question.answer}</Text>
                            :
                            <TouchableOpacity style={styles.showAnswerButton} onPress={this.showAnswer}>
                                <Text style={[styles.textCenter, styles.showAnswer]}>Show Answer</Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <If test={this.state.showAnswer && !this.state.answered}>
                        <View style={{ height: 130 }}>
                            <TouchableOpacity style={[styles.button, styles.correctButton]} onPress={this.correctAnswer}>
                                <Text style={[styles.textCenter, styles.buttonText]}>Correct</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.incorrectButton]} onPress={this.incorrectAnswer}>
                                <Text style={[styles.textCenter, styles.buttonText]}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </If>

                    <View style={{ height: 60 }}>
                        <View style={styles.navigationContainer}>
                            <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={this.restart}>
                                <Text style={[styles.textCenter, { color: gray }]}>Restart</Text>
                            </TouchableOpacity>

                            {this.state.hasNext ?
                                <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={this.nextQuestion}>
                                    <Text style={[styles.textCenter, { color: blue }]}>Next</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={() => this.props.navigation.navigate('DeckList')}>
                                    <Text style={[styles.textCenter, { color: gray }]}>Back to Decks</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </If>

                <If test={finished}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.finished}>{`You correctly answered ${this.state.correct} of ${deck.questions.length}`}</Text>
                        <TouchableOpacity style={styles.showAnswerButton} onPress={() => this.props.navigation.navigate('DeckList')}>
                            <Text style={styles.textCenter}>Back to Decks</Text>
                        </TouchableOpacity>
                    </View>
                </If>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textCenter: {
        textAlign: 'center'
    },
    question: {
        fontSize: 30,
        marginBottom: 40
    },
    showAnswer: {
        fontSize: 15,
        color: red
    },
    answer: {
        fontSize: 20
    },
    button: {
        height: 50,
        margin: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    restartButton: {
        flex: 1,
        borderColor: gray,
    },
    nextButton: {
        flex: 1,
        borderColor: blue,
    },
    correctButton: {
        borderColor: green,
        backgroundColor: green
    },
    incorrectButton: {
        borderColor: red,
        backgroundColor: red
    },
    showAnswerButton: {
        margin: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: white,
        fontSize: 25
    },
    finished: {
        fontSize: 40,
        textAlign: 'center'
    }
})