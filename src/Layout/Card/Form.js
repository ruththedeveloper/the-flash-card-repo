import React, { useState, useEffect } from "react";

export default function Form({
  front,
  back,
  submitForm,
  cancelForm,
  submitText,
  cancelText,
}) {
  const [formData, setFormData] = useState({ front: "", back: "" });

  useEffect(() => {
    setFormData({ front, back }); // front:front , back :back
  }, [front, back]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  // submitForm comes from add card component
  function handleSubmit(event) {
    event.preventDefault();
    submitForm(formData);
    setFormData({ front: "", back: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Front</label>
        <textarea
          name="front"
          onChange={handleChange}
          value={formData?.front}
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Front side of card"
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Back</label>
        <textarea
          name="back"
          onChange={handleChange}
          //defaultValue={card? card.back : ""}
          value={formData?.back}
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Back side of card"
        />
      </div>

      <div>
        <button onClick={cancelForm} className="btn btn-secondary mr-1">
          {cancelText}
        </button>

        <button type="Submit" className="btn btn-primary ">
          {submitText}
        </button>
      </div>
    </form>
  );
}
