import { FormRow, Alert } from "../../components/index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddWork = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    work,
    workLocation,
    workType,
    workTypeOptions,
    status,
    workStatusOptions,
    isEditing,
    handleChange,
    clearValues,
    createWork,
    editWork,
  } = useAppContext();

  const handleSubmit = (e) => {
    if (!work || !workLocation) {
      displayAlert();
      return;
    }
    if(isEditing){
     editWork();
     return
    }
    createWork()
    e.preventDefault();
  };

  const handleWorkInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };


  return (
    <Wrapper>
      <div className="form">
        <h3>{isEditing ? "edit work" : "add work"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="work"
            value={work}
            handleChange={handleWorkInput}
          />
          <FormRow
            type="text"
            name="workLocation"
            value={workLocation}
            handleChange={handleWorkInput}
          />
          <div className="form-row">
            <label htmlFor="workType" className="form-label">
              Work Type
            </label>

            <select
              name="workType"
              value={workType}
              onChange={handleWorkInput}
              className="form-select"
            >
              {workTypeOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="workStatus" className="form-label">
              Work Status
            </label>

            <select
              name="status"
              value={status}
              onChange={handleWorkInput}
              className="form-select"
            >
              {workStatusOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddWork;
