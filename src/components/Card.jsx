import { Draggable } from "@hello-pangea/dnd";
import "../styles/Card.css";


export default function Card({ card, index }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-dot high";
      case "medium":
        return "priority-dot medium";
      case "low":
        return "priority-dot low";
      default:
        return "priority-dot";
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <div className="card-header">
            <span className={getPriorityColor(card.priority)}></span>
            <p>{card.content}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
