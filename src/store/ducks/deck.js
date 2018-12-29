export const Types = {
    FETCH_DECKS: 'decks/FETCH_DECKS',
    SAVE_DECK: 'decks/ADD_DECK',
    DELETE_DECK: 'desck/DELETE_DECK'
}

const INITIAL_STATE = {}

export default function decks(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.FETCH_DECKS:
            return { ...action.payload }
        case Types.SAVE_DECK:
            const deck = action.payload
            return { ...state, [deck.title]: deck }
        case Types.DELETE_DECK:
            state[action.payload] = undefined
            delete state[action.payload]
            return { ...state }
        default:
            return state
    }
}

export const Creators = {
    fetch: (decks) => ({
        type: Types.FETCH_DECKS,
        payload: decks
    }),

    saveDeck: (deck) => ({
        type: Types.SAVE_DECK,
        payload: deck
    }),

    deleteDeck: (title) => ({
        type: Types.DELETE_DECK,
        payload: title
    })

}