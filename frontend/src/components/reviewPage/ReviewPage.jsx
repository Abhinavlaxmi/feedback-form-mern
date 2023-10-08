import React, { useState } from "react";
import "./reviewpage.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import axios from 'axios';

function ReviewSubmitPage() {

    const goals_option = [
        { value: 'Information', label: 'Information' },
        { value: ' Chat', label: ' Chat' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Buy', label: 'Buy' },
        { value: 'Socialize', label: 'Socialize' },
        { value: 'Other', label: 'Other' },
      ];

      const titles = [
        'Very Bad',
        'Bad',
        'Not Good',
        'Okay',
        'Good',
        'Very Good',
        'Excellent',
        'Outstanding',
        'Exceptional',
        'Perfect',
      ];

    const [formData, setFormData] = useState({
      frequency: "",
      goals: [],
      rating: 1,
      improvements: "",
      birthday: "",
    });
      
    const getRatingTitle = (rating) => {
      return titles[rating - 1];
    };

    const ratingTitle = getRatingTitle(formData.rating);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleGoals=(values)=>{
    let arr =[]
    for(let i=0; i<values.length; i++){
        arr.push(values[i].value)
    }
    setFormData({ ...formData, goals: arr });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // let data = JSON.stringify(formData)
    const response = await axios.post('http://localhost:4040/api/save-reviews', formData);

    if (response.status === 200) {
      window.location.href = '/view-reviews';
      console.log(response, "Response..")
    }
    console.log(formData);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-8 pt-3">
        <h3 className="text-center">App Review Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="frequency" className="form-label">
              How often do you use this app?
            </label>
            <select
              id="frequency"
              name="frequency"
              className="form-select"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="rarely">Rarely</option>
              <option value="first_time">First time</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="goals" className="form-label">
              What is your main goal for using this app?
            </label>
            <Select
                className="select-option"
                // value={selectedOption}
                isMulti={true}
                name="goals"
                onChange={handleGoals}
                options={goals_option}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rate your user experience (1-10): {ratingTitle}
            </label>
            <input
              type="range"
              id="rating"
              name="rating"
              className="form-range"
              min={1}
              max={10}
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="improvements" className="form-label">
              Do you have any suggestions for improving this app?
            </label>
            <textarea
              id="improvements"
              name="improvements"
              className="form-control"
              rows="4"
              value={formData.improvements}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">
              Enter your birthday:
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="form-control"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewSubmitPage;
