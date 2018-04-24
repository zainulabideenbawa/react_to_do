import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER } from "../constants";
import { bake_cookie, read_cookie } from "sfcookies";

const reminderItem = action => {
  let { text, dueDate } = action;
  return {
    id: Math.random(),
    text,
    dueDate
  };
};

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
};

const remindersList = (state = [], action) => {
  let reminders = null;
  state = read_cookie("reminders");

  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminderItem(action)];
      bake_cookie("reminders", reminders);
      console.log("reminders", reminders);
      return reminders;

    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie("reminders", reminders);
      return reminders;

    case CLEAR_REMINDER:
      reminders = [];
      bake_cookie("reminders", reminders);
      return reminders;

    default:
      return state;
  }
};

export default remindersList;
