import React, { useEffect, useState } from "react";
import "./showreviews.css";
import axios from "axios";

const ShowReviews = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    let response = await axios.get("http://localhost:4040/api/reviews");
    console.log(response, "Result of reviews");
    if (response.status === 200) {
      setData(response.data);
    } else {
      console.log("Error");
    }
  };

  const strToParse = (data) => {
    let item = JSON.parse(data);
    return item;
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-6 pt-3">
        <h3 className="text-center">Submitted Reviews</h3>
        <div className="list">
          {data?.map((item) => (
            <div className="data p-3 mb-3">
              <div className="d-flex justify-content-between col-12">
                <div className="col-6 item">
                  Often uses: <span className="value">{item.frequency}</span>
                </div>
                <div className="col-6 item">
                  App goal:{" "}
                  <span className="value">
                    {strToParse(item.goals).join(",")}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between col-12">
                <div className="col-6 item">
                  User experience: <span className="value">{item.rating}</span>
                </div>
                <div className="col-6 item">
                  Birthday: <span className="value">{item.birthday}</span>
                </div>
              </div>
              <div>
                <h6 className="item">Suggestions:</h6>
                <textarea
                  id="improvements"
                  name="improvements"
                  className="form-control suggestion"
                  rows="2"
                  disabled
                  value={item.improvements}
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowReviews;
