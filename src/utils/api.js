import { AsyncStorage } from 'react-native'

export const FLASHCARDS_DECK_STORAGE_KEY = 'Flashcards:decks'

export function fetchDecks() {
    return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
}

export function submitEntry(deck) {
    return AsyncStorage.mergeItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck,
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify(data))
        })
}