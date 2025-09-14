import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import "../styles/Board.css";
import columnData from "../data/columnData";

function randomizeColumns(data) {
  const newData = JSON.parse(JSON.stringify(data));
  const cardIds = Object.keys(newData.cards);


  newData.columnOrder.forEach(colId => {
    newData.columns[colId].cardIds = [];
  });


  cardIds.forEach(cardId => {
    const randomCol =
      newData.columnOrder[
      Math.floor(Math.random() * newData.columnOrder.length)
      ];
    newData.columns[randomCol].cardIds.push(cardId);
  });

  return newData;
}

export default function Board() {
  const [data, setData] = useState(() => randomizeColumns(columnData));

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = data.columns[source.droppableId];
    const endCol = data.columns[destination.droppableId];


    if (startCol === endCol) {
      const newCardIds = Array.from(startCol.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newCol = { ...startCol, cardIds: newCardIds };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newCol.id]: newCol,
        },
      };

      setData(newState);
      return;
    }


    const startCardIds = Array.from(startCol.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = { ...startCol, cardIds: startCardIds };

    const endCardIds = Array.from(endCol.cardIds);
    endCardIds.splice(destination.index, 0, draggableId);
    const newEnd = { ...endCol, cardIds: endCardIds };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      },
    };

    setData(newState);
  };


  const onAddCard = (columnId, content, priority) => {
    const newId = `card-${Date.now()}`;
    const newCard = { id: newId, content, priority };

    const updatedColumn = {
      ...data.columns[columnId],
      cardIds: [...data.columns[columnId].cardIds, newId],
    };

    setData({
      ...data,
      cards: { ...data.cards, [newId]: newCard },
      columns: { ...data.columns, [columnId]: updatedColumn },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {data.columnOrder.map((colId) => {
          const column = data.columns[colId];
          const cards = column.cardIds.map((cardId) => data.cards[cardId]);

          return (
            <Column
              key={column.id}
              column={column}
              cards={cards}
              onAddCard={onAddCard}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
