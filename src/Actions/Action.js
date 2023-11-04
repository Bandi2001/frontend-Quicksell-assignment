import axios from 'axios';

const DATA_REQUEST = 'DATA_REQUEST';
const DATA_SUCCESS = 'DATA_SUCCESS';
const DATA_FAILURE = 'DATA_FAILURE';

const SELECT_DATA_REQUEST = 'SELECT_DATA_REQUEST';
const SELECT_DATA_SUCCESS = 'SELECT_DATA_SUCCESS';
const SELECT_DATA_FAILURE = 'SELECT_DATA_FAILURE';


export const dataRequest = () => ({ type: DATA_REQUEST });
export const dataSuccess = (data) => ({ type: DATA_SUCCESS, payload: data });
export const dataFailure = () => ({ type: DATA_FAILURE });

export const selectDataRequest = () => ({ type: SELECT_DATA_REQUEST });
export const selectDataSuccess = (selectedData, user) => ({
  type: SELECT_DATA_SUCCESS,
  payload: { selectedData, user },
});
export const selectDataFailure = (error) => ({
  type: SELECT_DATA_FAILURE,
  payload: error.message,
});


export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch(dataRequest());

    const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");

    dispatch(dataSuccess(data));
  } catch (error) {
    dispatch(dataFailure());
  }
};

export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch(selectDataRequest());

    let user = false;
    let selectedData = [];

    if (group === 'status') {
      const statusSet = new Set(allTickets.map((elem) => elem.status));
      const arr = [...statusSet];

      arr.forEach((elem, index) => {
        const filteredArr = allTickets.filter((fElem) => elem === fElem.status);
        selectedData.push({
          [index]: {
            title: elem,
            value: filteredArr,
          },
        });
      });
    } else if (group === 'user') {
      user = true;
      allTickets.allUser.forEach((elem, index) => {
        const arr = allTickets.allTickets.filter((Felem) => elem.id === Felem.userId);
        selectedData.push({
          [index]: {
            title: elem.name,
            value: arr,
          },
        });
      });
    } else {
      const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((elem, index) => {
        const arr = allTickets.filter((fElem) => index === fElem.priority);
        selectedData.push({
          [index]: {
            title: elem,
            value: arr,
          },
        });
      });
    }

    if (orderValue === "title") {
      selectedData.forEach((elem) => {
        elem[Object.keys(elem)[0]].value.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    if (orderValue === "priority") {
      selectedData.forEach((elem) => {
        elem[Object.keys(elem)[0]].value.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch(selectDataSuccess(selectedData, user));
  } catch (error) {
    dispatch(selectDataFailure(error));
  }
};
