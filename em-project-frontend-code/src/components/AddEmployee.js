import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value });
    };

    const saveEmployee = (e) => {
        e.preventDefault();
        EmployeeService.saveEmployee(employee)
            .then((response) => {
                console.log("saved ", response);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const reset = (e) => {
        e.preventDefault();
        setEmployee({
            id: "",
            name: "",
            phone: "",
            email: "",
        });
    };

    const navigate = useNavigate();
    
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='max-w-xl w-full bg-white rounded-lg shadow-lg py-6 px-8'>
                <div className='text-4xl font-bold text-center mb-8'>
                    <p>Add Course</p>
                </div>

                <div className='space-y-4'>
                    <input
                        type='text'
                        name='name'
                        value={employee.name}
                        onChange={(e) => handleChange(e)}
                        className='w-full py-2 px-4 border border-gray-300 rounded-md'
                        placeholder='Course Title'
                    />

                    <input
                        type='text'
                        name='phone'
                        value={employee.phone}
                        onChange={(e) => handleChange(e)}
                        className='w-full py-2 px-4 border border-gray-300 rounded-md'
                        placeholder='Course Code'
                    />

                    <input
                        type='text'
                        name='email'
                        value={employee.email}
                        onChange={(e) => handleChange(e)}
                        className='w-full py-2 px-4 border border-gray-300 rounded-md'
                        placeholder='Course Description'
                    />
                </div>

                <div className='flex justify-between mt-6'>
                    <button
                        onClick={saveEmployee}
                        className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md'>
                        Save
                    </button>
                    <button
                        onClick={reset}
                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'>
                        Clear
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
