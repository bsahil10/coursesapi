import axios from 'axios';

// Base URL for Instance API
const INSTANCE_S_API_BASE_URL = "http://localhost:9090/instances";

class InstanceService {
    // Save an instance
    saveInstance(instance) {
        return axios.post(INSTANCE_S_API_BASE_URL, instance);
    }

    // Get all instances
    getInstances() {
        return axios.get(INSTANCE_S_API_BASE_URL);
    }

    // Get a single instance by ID
    getInstanceById(id) {
        return axios.get(`${INSTANCE_S_API_BASE_URL}/${id}`);
    }

    // Delete an instance by ID
    deleteInstanceById(id) {
        return axios.delete(`${INSTANCE_S_API_BASE_URL}/${id}`);
    }

    // Update an instance by ID
    updateInstance(instance, id) {
        return axios.put(`${INSTANCE_S_API_BASE_URL}/${id}`, instance);
    }
}

// Export an instance of the InstanceService class
export default new InstanceService();
