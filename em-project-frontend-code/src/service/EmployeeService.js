import axios from 'axios';

// Base URL for Employee API
const EMPLOYEE_S_API_BASE_URL = "http://localhost:9090/employees";

class EmployeeService {
    // Save an employee
    saveEmployee(employee) {
        return axios.post(EMPLOYEE_S_API_BASE_URL, employee);
    }

    // Get all employees
    getEmployees() {
        return axios.get(EMPLOYEE_S_API_BASE_URL);
    }

    // Get a single employee by ID
    getEmployeeById(id) {
        return axios.get(`${EMPLOYEE_S_API_BASE_URL}/${id}`);
    }

    // Delete an employee by ID
    deleteEmployeeById(id) {
        return axios.delete(`${EMPLOYEE_S_API_BASE_URL}/${id}`);
    }

    // Update an employee by ID
    updateEmployee(employee, id) {
        return axios.put(`${EMPLOYEE_S_API_BASE_URL}/${id}`, employee);
    }
}

// Export an instance of the EmployeeService class
export default new EmployeeService();
