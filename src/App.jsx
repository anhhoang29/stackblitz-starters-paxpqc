import React, { useState, useEffect } from 'react';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [msg, setMsg] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    setData(storedData);
  }, []);

  const formValidation = () => {
    if (textInput === '') {
      setMsg('Task cannot be blank');
    } else {
      setMsg('');
      acceptData();
      closeModal();
    }
  };

  const acceptData = () => {
    const newData = {
      text: textInput,
      date: dateInput,
    };

    const updatedData = [...data, newData];
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const deleteTask = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const onEdit = (index) => {
    const updatedData = [...data];
    updatedData[index] = {
      text: textInput,
      date: dateInput,
    };
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
    closeModal();
  };

  const resetForm = () => {
    setTextInput('');
    setDateInput('');
  };

  const closeModal = () => {
    resetForm();
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.classList.remove('show');
    }
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  };

  return (
    <div className="container mt-4">
      <button
        id="btnModal"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#form"
      >
        Add New Task
      </button>

      <form
        className="modal fade"
        id="form"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={(e) => {
          e.preventDefault();
          formValidation();
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>Task Title</p>
              <input
                type="text"
                className="form-control"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <div id="msg">{msg}</div>
              <br />
              <p>Due Date</p>
              <input
                type="date"
                className="form-control"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <br />
            </div>
            <div className="modal-footer" id="modalFooter">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>

      <div id="tasks" className="mt-4">
        <h3>Your Todo List</h3>
        <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Todo Name</th>
              <th scope="col">Due Date</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index}>
                <th className="stt" scope="row">
                  {index + 1}
                </th>
                <td className="todoText">{task.text}</td>
                <td className="todoDate">{task.date}</td>
                <td>
                  <ul className="list-inline m-0">
                    <li className="list-inline-item">
                      <button
                        className="btn btn-success btn-sm rounded-0"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Edit"
                        data-bs-toggle="modal"
                        data-bs-target="#form"
                        onClick={() => {
                          setTextInput(task.text);
                          setDateInput(task.date);
                          const modalFooter =
                            document.getElementById('modalFooter');
                          if (modalFooter) {
                            modalFooter.innerHTML = `
                              <button type="button" id="edit" class="btn btn-primary" onClick="onEdit(${index})">
                                  Edit
                              </button>`;
                          }
                        }}
                      >
                        Edit
                      </button>
                    </li>
                    <li className="list-inline-item">
                      <button
                        className="btn btn-danger btn-sm rounded-0"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;