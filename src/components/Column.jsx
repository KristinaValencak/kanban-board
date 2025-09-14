import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import "../styles/Column.css";

export default function Column({ column, cards, onAddCard }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCardText, setNewCardText] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const handleAdd = () => {
    if (!newCardText.trim()) return;
    onAddCard(column.id, newCardText, newPriority);
    setNewCardText("");
    setNewPriority("medium");
    setIsAdding(false);
  };

  return (
    <div className="column">
      <div className="column-title">
        <span>{column.title}</span>
        <button className="add" onClick={() => setIsAdding(!isAdding)}>
          +
        </button>
      </div>

      {isAdding && (
        <div className="add-card-inline">
          <input
            type="text"
            placeholder="Enter card text..."
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
          />


          <div className="priority-options">
            <label>
              <input
                type="radio"
                name="priority"
                value="high"
                checked={newPriority === "high"}
                onChange={(e) => setNewPriority(e.target.value)}
              />
              High
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={newPriority === "medium"}
                onChange={(e) => setNewPriority(e.target.value)}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="low"
                checked={newPriority === "low"}
                onChange={(e) => setNewPriority(e.target.value)}
              />
              Low
            </label>
          </div>

          <div className="inline-actions">
            <button onClick={handleAdd}>Add</button>
            <button
              className="cancel-btn"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`card-list ${snapshot.isDraggingOver ? "dragging-over" : ""
              }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
