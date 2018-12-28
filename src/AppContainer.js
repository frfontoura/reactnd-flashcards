import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import DeckList from './components/deck/DeckList'
import DeckDetail from './components/deck/DeckDetail'
import NewDeck from './components/deck/NewDeck'
import NewCard from './components/deck/NewCard'
import Quiz from './components/deck/Quiz'

const MainStackNavigator = createStackNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: () => ({
            title: 'Decks'
        })
     },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deck.title}`
        })
    },
    AddCard: {
        screen: NewCard,
        navigationOptions: ({ navigation }) => ({
            title: `Add card to ${navigation.state.params.deck.title}`
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            title: `Quiz ${navigation.state.params.deck.title}`
        })
    }
})

const AppStackNavigator = createDrawerNavigator({
    Home: { screen: MainStackNavigator },
    Add: { screen: NewDeck }
}, {
    unmountInactiveRoutes: true
})

export default createAppContainer(AppStackNavigator)