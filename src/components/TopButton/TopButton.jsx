import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./TopButton.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../Actions/Action";

const TopButton = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  const getLocalStorageValue = (key, defaultValue) => {
    return localStorage.getItem(key) || defaultValue;
  };

  const [groupValue, setGroupValue] = useState(getLocalStorageValue("group", "status"));
  const [orderValue, setOrderValue] = useState(getLocalStorageValue("order", "priority"));

  const handleValueChange = (e, key) => {
    const value = e.target.value;
    if (key === "group") {
      setGroupValue(value);
      localStorage.setItem("group", value);
    } else if (key === "order") {
      setOrderValue(value);
      localStorage.setItem("order", value);
    }
    setDisplayOnClick(false);
  };

  useEffect(() => {
    const data = groupValue === "user" ? { allTickets, allUser } : allTickets;
    dispatch(selectData(groupValue, data, orderValue));
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="top-header" style={{ paddingLeft: "10px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          {" "}
          <TiThList /> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleValueChange(e, "group")}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleValueChange(e, "order")}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopButton;
