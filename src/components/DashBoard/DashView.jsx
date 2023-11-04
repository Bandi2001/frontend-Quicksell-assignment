import React from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillExclamationTriangleFill } from "react-icons/bs"; // Import symbols for different priorities
import { FaExclamationCircle } from "react-icons/fa"; // Import another symbol
import {IoAlertCircleOutline} from "react-icons/io5";
import {MdAlarm} from "react-icons/md";

import "./DashView.css";
import Card from "../Card/Card";

const DashView = () => {
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  return (
    selectedData && (
      <div className="dashContainer" style={{ justifyContent: "space-evenly" }}>
        {selectedData.map((elem, index) => {
          // Define the symbol based on the priority
          let prioritySymbol;
          if (elem.priority === "3") {
            prioritySymbol = <AiOutlinePlus />;
          } else if (elem[index]?.priority === "0") {
            prioritySymbol = <FaExclamationCircle />;
          }else if(elem[index]?.status === "Todo"){
            prioritySymbol = <FaExclamationCircle />;
          }
           else {
            // Default symbol for other cases
            prioritySymbol = <MdAlarm />;
          }

          return (
            <div key={index} className="dashCardContainer">
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {!user ? (
                    prioritySymbol // Display the selected symbol
                  ) : (
                    <>
                      <div
                        className="imageContainer relative"
                        style={{ width: "15px", height: "15px", display: 'inline-block' }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                          src="https://cdn.vectorstock.com/i/1000x1000/00/74/young-man-profile-vector-14770074.webp"
                          alt="UserImage"
                        />
                      </div>
                    </>
                  )}
                  <span>
                    {" "}
                    {elem[index]?.title} {elem[index]?.value?.length}
                  </span>
                </div>
                <div className="rightView">
                  <AiOutlinePlus />{" "}
                  <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {elem[index]?.value?.map((elem, ind) => {
                  return (
                    <Card id={elem.id} title={elem.title} tag={elem.tag} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default DashView;