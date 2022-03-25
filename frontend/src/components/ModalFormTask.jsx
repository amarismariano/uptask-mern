import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const PRIORITY = ["Baja", "Media", "Alta"];

const ModalFormTask = () => {
  const { modalFormTask, handleModalTask, showAlert, alert, submitTask } =
    useProjects();

  //States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if ([name, description, priority].includes("")) {
      showAlert({
        msg: "All Fields Are Mandatory",
        error: true,
      });
      return;
    }

    submitTask({ name, description, priority });
  };

  const { msg } = alert;

  return (
    <Transition.Root show={modalFormTask} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Create Task
                  </Dialog.Title>

                  {msg && <Alert alert={alert} />}
                  <form onSubmit={handleSubmit} className="my-10">
                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="name"
                      >
                        Task Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Task Name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="description"
                      >
                        Task Description
                      </label>
                      <textarea
                        id="description"
                        placeholder="Description of the Task"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="priority"
                      >
                        Task Priority
                      </label>
                      <select
                        id="priority"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="">-- Select --</option>

                        {PRIORITY.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                      value="Add Task"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormTask;
