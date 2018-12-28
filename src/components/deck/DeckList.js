import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { lightGray, blue } from '../../utils/colors'
import { fetchDecks } from '../../utils/api'
import { Creators as DeckActions } from '../../store/ducks/deck'

class DeckList extends Component {
  static navigationOptions = {
    drawerLabel: 'Decks'
  }

  componentDidMount() {
     fetchDecks().then((results) => this.props.fetch(JSON.parse(results)))
  }

  render() {
    const { decks } = this.props

    return (
      <ScrollView style={{ flex: 1 }}>

        {
          Object.keys(decks).map(key => {
            const deck = decks[key]
            return (
              <TouchableOpacity key={key} style={styles.deck} onPress={() => this.props.navigation.navigate('DeckDetail', { deck })}>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
              </TouchableOpacity>
            )
          })
        }

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    height: 150,
    backgroundColor: lightGray,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deckTitle: {
    fontSize: 22,
    color: blue
  }
})


const mapStateToProps = state => ({
  decks: state.deck
})

const mapDispatchToProps = dispatch => bindActionCreators(DeckActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)