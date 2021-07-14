import React from 'react';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';
import { deleteCard } from '../action/cardAction';

const TrelloCard = ({text, id, listId, index, dispatch}) =>{
    const deleteCardTest = (id) =>{
        dispatch(deleteCard(listId, id));
    }

    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided=>(
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> 
                    <Card style={styles.cardContainer}>
                        <CardContent>
                            <Typography  color="textSecondary" gutterBottom>
                            {text}
                            </Typography>
                            <div style={styles.formButtonGroup}>
                                <Button variant="contained" onClick={()=>deleteCardTest(id)} style={{color: "white", backgroundColor: "#5aac44"}}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

const styles = {
    cardContainer: {
        marginBottom: 8
    },
    formButtonGroup : {
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
};

export default connect()(TrelloCard);