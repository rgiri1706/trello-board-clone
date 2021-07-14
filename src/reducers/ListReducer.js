import { CONSTANTS } from '../action/index';

let listId = 2;
let cardId = 4;
const initialState = [
    {
        title: "Teams",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: 'Testing cards'
            },
            {
                id: `card-${1}`,
                text: 'Testing 2'
            }
        ]
    },
    {
        title: "Products",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: 'Testing cards3'
            },
            {
                id: `card-${3}`,
                text: 'Testing 4'
            }
        ]
    }
]

const listReducer = (state=initialState, action) => {
    switch(action.type){
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listId}`
            }
            listId=listId + 1;
            return [...state, newList];
        case CONSTANTS.DRAG_HAPPENED:
            const { 
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload;
            const newStateCard = [...state];

            //in the same list dragging

            if(droppableIdStart === droppableIdEnd){
                const list = state.find(list=> droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            //in different list dragging

            if(droppableIdStart !== droppableIdEnd){

                //find the list where drag happened
                const listStart = state.find(list=> droppableIdStart === list.id);

                //pull out the card from the list
                const card = listStart.cards.splice(droppableIndexStart, 1);

                const listEnd = state.find(list=> droppableIdEnd === list.id);

                //Put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newStateCard;

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card-${cardId}`
            }
            cardId=cardId + 1;
            const newState = state.map(list=>{
                if(list.id === action.payload.cardID){
                    return {
                        ...list,
                        cards:[...list.cards, newCard]
                    }
                }else{
                    return list;
                }
            });
            return newState;
        case CONSTANTS.DELETE_CARD:
            const modifiedState = state.map(list=>{
                if(list.id === action.payload.listID){
                    const newArr = list.cards.filter(l=> l.id !== action.payload.cardID);
                    return {
                        ...list,
                        cards: newArr
                    };
                }else{
                    return list;
                }
            });
            return modifiedState;
        default:
            return state;
    }
};

export default listReducer;