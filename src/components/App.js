import './App.css';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext } from 'react-beautiful-dnd';
import { sort } from "../action/listActions";

function App(list) {

  const onDragEnd = (result) =>{
    const { destination, source, draggableId } = result;
    if(!destination){
      return;
    }
    list.dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId))
    
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
            <div style={styles.headingText}>
              Trello App
            </div>
            <div style={styles.listContainer}>
              {list.list.map(li=> <TrelloList id={li.id} key={li.id} title={li.title} cards={li.cards} />)}
              <TrelloActionButton list />
            </div>
        </div>
    </DragDropContext>
  );
}

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: " row"
  },
  headingText: {
    fontSize: 28,
    margin: 30,
    paddingBottom: 14,
    borderBottom: "1px solid black"
  }
}

const mapStateToProps = state => ({
  list: state.list
});

export default connect(mapStateToProps)(App);
