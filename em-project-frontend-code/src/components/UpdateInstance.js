import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InstanceService from '../service/InstanceService';

const UpdateInstance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [instance, setInstance] = useState({
        id: id,
        course: "",
        instanceCode: "",
        year: "",
        semester: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setInstance({ ...instance, [e.target.name]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InstanceService.getInstanceById(instance.id);
                setInstance(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [instance.id]);

    const updateInstance = (e) => {
        e.preventDefault();
        InstanceService.updateInstance(instance, id)
            .then((response) => {
                console.log("Updated", response);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="max-w-xl mx-auto bg-white my-20 rounded shadow-lg py-4 px-8 border">
            <div className="text-4xl tracking-wider font-bold text-center py-4">
                <p>Update Instance</p>
            </div>

            <div className="mx-10 my-2">
                <input
                    type="text"
                    name="course"
                    value={instance.course}
                    onChange={(e) => handleChange(e)}
                    className="w-full py-2 my-4 text-slate-800 border-b border-gray-300 focus:outline-none"
                    placeholder="Course Title"
                />
                <input
                    type="text"
                    name="instanceCode"
                    value={instance.instanceCode}
                    onChange={(e) => handleChange(e)}
                    className="w-full py-2 my-4 text-slate-800 border-b border-gray-300 focus:outline-none"
                    placeholder="Instance Code"
                />
                <input
                    type="text"
                    name="year"
                    value={instance.year}
                    onChange={(e) => handleChange(e)}
                    className="w-full py-2 my-4 text-slate-800 border-b border-gray-300 focus:outline-none"
                    placeholder="Year"
                />
                <input
                    type="text"
                    name="semester"
                    value={instance.semester}
                    onChange={(e) => handleChange(e)}
                    className="w-full py-2 my-4 text-slate-800 border-b border-gray-300 focus:outline-none"
                    placeholder="Semester"
                />
            </div>

            <div className="flex justify-center my-4 space-x-4">
                <button
                    onClick={updateInstance}
                    className="bg-green-400 hover:bg-green-700 text-white py-2 px-6 rounded"
                >
                    Update
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="bg-red-400 hover:bg-red-700 text-white py-2 px-6 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UpdateInstance;
