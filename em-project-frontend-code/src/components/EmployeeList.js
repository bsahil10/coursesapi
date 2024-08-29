import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import InstanceService from '../service/InstanceService';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employeeResponse = await EmployeeService.getEmployees();
        const instanceResponse = await InstanceService.getInstances();
        setEmployees(employeeResponse.data);
        setInstances(instanceResponse.data);
        setFilteredInstances(instanceResponse.data); // Initialize with all instances
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filterInstances = () => {
    if (year && semester) {
      const filtered = instances.filter(
        (instance) => instance.year === year && instance.semester === semester
      );
      setFilteredInstances(filtered);
    } else if (year && !semester) {
      const filtered = instances.filter(
        (instance) => instance.year === year
      );
      setFilteredInstances(filtered);
    } else {
      setFilteredInstances(instances); // Load all instances if no filters are applied
    }
  };

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id).then(() => {
      if (employees) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      }
    });
  };

  const deleteInstance = (e, id) => {
    e.preventDefault();
    InstanceService.deleteInstanceById(id).then(() => {
      if (filteredInstances) {
        setFilteredInstances((prevInstances) =>
          prevInstances.filter((instance) => instance.id !== id)
        );
      }
    });
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  const editInstance = (e, id) => {
    e.preventDefault();
    navigate(`/editInstance/${id}`);
  };

  return (
    <div className="flex flex-col mx-auto my-8 space-y-8 px-4 sm:px-8">
      {/* Employee Section */}
      <div className="flex flex-col sm:flex-row justify-between w-full space-y-8 sm:space-y-0">
        <div className="w-full sm:w-1/2 pr-0 sm:pr-4 mt-4">
          <div className="space-y-4 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={() => navigate('/addEmployee')}
                className="bg-blue-500 hover:bg-blue-700 font-semibold px-6 py-2 rounded w-full sm:w-auto"
              >
                Add Course
              </button>

              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded w-full sm:w-auto"
              >
                List Courses
              </button>
            </div>

            <div className="overflow-x-auto mt-10">
              <table className="min-w-full shadow">
                <thead className="bg-blue-400 text-left">
                  <tr>
                    <th className="px-6 py-3 tracking-wide w-1/2 border-r">Course Title</th>
                    <th className="px-6 py-3 tracking-wide w-1/4 border-r">Code</th>
                    <th className="px-6 py-3 tracking-wide w-1/4">Action</th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-white hover:text-black">
                        <td className="text-left px-3 py-4 border-r">{employee.name}</td>
                        <td className="text-left px-3 py-4 border-r">{employee.phone}</td>
                        <td className="text-left px-3 py-4">
                          <a
                            onClick={(e) => editEmployee(e, employee.id)}
                            className="hover:text-green-500 hover:cursor-pointer"
                          >
                            🔍
                          </a>
                          <a
                            onClick={(e) => deleteEmployee(e, employee.id)}
                            className="hover:text-red-500 hover:cursor-pointer ml-4"
                          >
                            🗑️
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        {/* Instance Section */}
        <div className="w-full sm:w-1/2 pl-0 sm:pl-4 mt-4 sm:mt-0">
          <div className="space-y-4 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={() => navigate('/addInstance')}
                className="bg-blue-500 hover:bg-blue-700 font-semibold px-6 py-2 rounded w-full sm:w-auto"
              >
                Add Instance
              </button>

              {/* Year and Semester Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 w-full sm:w-auto">
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Year"
                  className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
                />
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
                >
                  <option value="" disabled>
                    Select semester
                  </option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
                <button
                  onClick={filterInstances}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded w-full sm:w-auto"
                >
                  List Instances
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full shadow">
                <thead className="bg-blue-400 text-left">
                  <tr>
                    <th className="px-6 py-3 tracking-wide w-1/2 border-r">Course Title</th>
                    <th className="px-6 py-3 tracking-wide w-1/4 border-r">Year-Sem</th>
                    <th className="px-6 py-3 tracking-wide w-1/4 border-r">Instance Code</th>
                    <th className="px-6 py-3 tracking-wide">Action</th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {filteredInstances.map((instance) => (
                      <tr key={instance.id} className="hover:bg-white hover:text-black">
                        <td className="text-left px-3 py-4 border-r">{instance.course}</td>
                        <td className="text-left px-3 py-4 border-r">{instance.year + "-" + instance.semester}</td>
                        <td className="text-left px-3 py-4 border-r">{instance.instanceCode}</td>
                        <td className="text-left px-3 py-4">
                          <a
                            onClick={(e) => editInstance(e, instance.id)}
                            className="hover:text-green-500 hover:cursor-pointer"
                          >
                            📝
                          </a>
                          <a
                            onClick={(e) => deleteInstance(e, instance.id)}
                            className="hover:text-red-500 hover:cursor-pointer ml-4"
                          >
                            🗑️
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
