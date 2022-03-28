import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  // Context
  const { handleModalEditTask, handleModalDeleteTask } = useProjects();

  const { description, name, deadline, priority, status, _id } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{formatDate(deadline)}</p>
        <p className="mb-1 text-gray-600">Priority: {priority}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleModalEditTask(task)}
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Edit
        </button>
        {status ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Complete
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incomplete
          </button>
        )}

        <button
          onClick={() => handleModalDeleteTask(task)}
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
