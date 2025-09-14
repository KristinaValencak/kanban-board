const columnData = {
  columns: {
    "col-1": {
      id: "col-1",
      title: "📝 Todo",
      cardIds: [],
    },
    "col-2": {
      id: "col-2",
      title: "⚡ In Progress",
      cardIds: [],
    },
    "col-3": {
      id: "col-3",
      title: "👀 Review",
      cardIds: [],
    },
    "col-4": {
      id: "col-4",
      title: "🚫 Blocked",
      cardIds: [],
    },
    "col-5": {
      id: "col-5",
      title: "✅ Done",
      cardIds: [],
    },
  },

  cards: {
    "card-1": {
      id: "card-1",
      content: "Research API documentation for tax endpoint",
      priority: "high",
    },
    "card-2": {
      id: "card-2",
      content: "Implement login form with validation",
      priority: "low",
    },
    "card-3": {
      id: "card-3",
      content: "Connect frontend with backend API",
      priority: "medium",
    },
    "card-4": {
      id: "card-4",
      content: "Write unit tests for Board component",
      priority: "high",
    },
    "card-5": {
      id: "card-5",
      content: "Deploy app to staging environment",
      priority: "low",
    },
  },

  columnOrder: ["col-1", "col-2", "col-3", "col-4", "col-5"],
};

export default columnData;