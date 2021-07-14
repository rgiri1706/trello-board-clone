import { CONSTANTS } from "./index";

export const addCard = (cardID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, cardID}
    };
};

export const deleteCard = (listID, cardID) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {listID, cardID}
    };
};