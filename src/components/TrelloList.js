import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import { Droppable } from 'react-beautiful-dnd';

const TrelloList =({title, cards, id}) => (
    <Droppable droppableId={String(id)}>
        {provided=>(
        <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
            <h3>{title}</h3>
            {cards.map((card, index)=> <TrelloCard index={index} listId={id} key={card.id} text={card.text} id={card.id} />)}
            <TrelloActionButton listID={id} />
            {provided.placeholder}
        </div>
        )}
    </Droppable>
);

const styles = {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 3,
        width: 300,
        height: "100%",
        padding: 8,
        marginRight: 8
    }
};

export default TrelloList;

