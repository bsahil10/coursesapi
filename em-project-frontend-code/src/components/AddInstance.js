import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import InstanceService from '../service/InstanceService';

const AddInstance = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const response = await EmployeeService.getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const saveInstance = async (e) => {
        e.preventDefault();

        if (!selectedEmployee) {
            alert("Please select a course/employee.");
            return;
        }

        const instance = {
            course: course,
            year: year,
            semester: semester,
            instanceCode: selectedEmployee.phone
        };

        try {
            const response = await InstanceService.saveInstance(instance);
            console.log('Instance saved:', response);
            navigate('/');
        } catch (error) {
            console.error('Error saving instance:', error);
        }
    };

    const reset = (e) => {
        e.preventDefault();
        setYear('');
        setSemester('');
        setCourse('');
        setSelectedEmployee(null);
    };

    return (
        <div className="max-w-xl mx-auto bg-white my-20 rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-3xl font-semibold text-center mb-6">
                Add Instance
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <select
                    value={course}
                    onChange={(e) => {
                        const selected = employees.find(emp => emp.name === e.target.value);
                        setCourse(e.target.value);
                        setSelectedEmployee(selected);
                    }}
                    className="flex-grow border border-gray-300 rounded px-4 py-2 mb-4 sm:mb-0 sm:mr-4"
                >
                    <option value="" disabled>
                        Select course
                    </option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.name}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                    className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Semester"
                    className="border border-gray-300 rounded px-4 py-2 mt-4 sm:mt-0"
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-center mb-6">
                <button
                    onClick={saveInstance}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4"
                >
                    Add Instance
                </button>
                

            </div>
          
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    onClick={reset}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded w-full sm:w-auto"
                >
                    Reset
                </button>
                <button 
                    onClick={() => navigate("/")}
                    className='bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded w-full sm:w-auto'
                >  
                    Cancel 
                </button>
            </div>
        </div>
    );
};

export default AddInstance;
