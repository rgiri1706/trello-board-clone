import { Button, Card } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../action/cardAction';
import { addList } from "../action";

class TrelloActionButton extends Component{

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true
        });
    }

    closeForm =(e) =>{
        this.setState({formOpen: false});
    }
    handleInput=e=>{
        this.setState({text: e.target.value})
    }

    handleAddList = () =>{
        const { dispatch } = this.props;
        const { text } =this.state;

        if(text){
            dispatch(addList(text));
        }
        this.setState({
            text: ""
        });
        return ;
    }

    handleAddCard = () =>{
        const { dispatch , listID} = this.props;
        const { text } =this.state;

        if(text){
            dispatch(addCard(listID,text));
        }
        this.setState({
            text: ""
        });
        return ;
    }

    renderAddButton=()=>{
        const { list } = this.props;
        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1: 0.5;
        const buttonTextColor = list ? "white": "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div onClick={this.openForm} style={{
                ...styles.openForButton,
                opacity : buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground
            }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }

    renderForm = ()=>{
        const { list } = this.props;
        const placeholder = list ? "Enter List Title" : "Enter a title for this card";
        const buttonTitle = list ? "Add list" : "Add Card";
        return (
        <div>
            <Card style={styles.cardStyle}>
                <TextareaAutosize placeholder={placeholder} autoFocus onBlur={this.closeForm} value={this.state.text} onChange={this.handleInput} style={{resize: "none", width: "100%", outline: "none", border: "none"}}/>
            </Card>
            <div style={styles.formButtonGroup}>
                <Button onMouseDown={list ? this.handleAddList: this.handleAddCard} variant="contained" style={{color: "white", backgroundColor: "#5aac44"}}>
                    {buttonTitle}
                </Button>
                <Icon style={{marginLeft: 8, cursor: "pointer"}}>close</Icon>
            </div>
        </div>
        );
    }

    render(){
        return this.state.formOpen ? this.renderForm(): this.renderAddButton();
    }
}

const styles = {
    openForButton: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    cardStyle: {
        overflow: "visible", 
        minHeight: 80, 
        minWidth: 272, 
        padding: "6px 8px 2px"
    },
    formButtonGroup : {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}

export default connect()(TrelloActionButton);
