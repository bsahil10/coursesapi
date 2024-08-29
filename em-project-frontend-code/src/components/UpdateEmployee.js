import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService'

const UpdateEmployee = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        id: id,
        name: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EmployeeService.getEmployeeById(employee.id);
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const updateEmployee = (e) => {
        e.preventDefault();
        EmployeeService.updateEmployee(employee, id)
            .then((response) => {
                console.log("saved ", response);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg p-8'>
                <div className='text-4xl tracking-wider font-bold text-center py-4'>
                    <p>Update Course</p>
                </div>

                <div className='my-4'>
                    <input
                        type='text'
                        name="name"
                        value={employee.name}
                        onChange={(e) => handleChange(e)}
                        className="w-full py-2 my-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder='Name'
                    />

                    <input
                        type='text'
                        name='phone'
                        value={employee.phone}
                        onChange={(e) => handleChange(e)}
                        className="w-full py-2 my-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder='Phone'
                    />

                    <input
                        type='text'
                        name='email'
                        value={employee.email}
                        onChange={(e) => handleChange(e)}
                        className="w-full py-2 my-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder='Email'
                    />
                </div>

                <div className='flex justify-center space-x-4'>
                    <button
                        onClick={updateEmployee}
                        className='bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded'
                    > 
                        Update 
                    </button>
                    <button 
                        onClick={() => navigate("/")}
                        className='bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded'
                    > 
                        Cancel 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee;
