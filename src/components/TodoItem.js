import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

const TodoItem = ({ item, getTasks }) => {
  const updateTaskStatus = async () => {
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        isComplete: !item.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${item._id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const urgentTask = async () => {
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        isUrgent: !item.isUrgent,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div
          className={`todo-item ${item.isComplete ? "completed" : ""} ${
            item.isUrgent ? "urgent" : ""
          }`}
        >
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={deleteTask}>
              삭제
            </button>
            <button className="button-update" onClick={updateTaskStatus}>
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
            <button className="button-urgent" onClick={urgentTask}>
              {item.isUrgent ? "긴급 해제" : "※긴급 ※"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
