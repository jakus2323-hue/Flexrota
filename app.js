// FLEXROTA - Main App Logic

// Store data in the browser for now.
// We'll connect a proper database later.
let employees = JSON.parse(localStorage.getItem("flexrota_employees")) || [];
let shifts = JSON.parse(localStorage.getItem("flexrota_shifts")) || [];

function saveData() {
  localStorage.setItem("flexrota_employees", JSON.stringify(employees));
  localStorage.setItem("flexrota_shifts", JSON.stringify(shifts));
}

// Add a new employee
function addEmployee(name) {
  if (!name || name.trim() === "") {
    return false;
  }

  const employee = {
    id: Date.now(),
    name: name.trim()
  };

  employees.push(employee);
  saveData();

  return employee;
}

// Remove an employee
function removeEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);

  // Also remove their shifts
  shifts = shifts.filter(shift => shift.employeeId !== id);

  saveData();
}

// Add a shift
function addShift(employeeId, date, startTime, endTime, task) {
  const shift = {
    id: Date.now(),
    employeeId: employeeId,
    date: date,
    startTime: startTime,
    endTime: endTime,
    task: task || "",
    response: "pending"
  };

  shifts.push(shift);
  saveData();

  return shift;
}

// Edit a shift
function editShift(id, updates) {
  const shift = shifts.find(shift => shift.id === id);

  if (!shift) {
    return false;
  }

  Object.assign(shift, updates);
  saveData();

  return shift;
}

// Delete a shift
function deleteShift(id) {
  shifts = shifts.filter(shift => shift.id !== id);
  saveData();
}

// Employee responds to a shift
function respondToShift(id, response) {
  if (!["yes", "no"].includes(response)) {
    return false;
  }

  const shift = shifts.find(shift => shift.id === id);

  if (!shift) {
    return false;
  }

  shift.response = response;
  saveData();

  return shift;
}

// Get an employee's shifts
function getEmployeeShifts(employeeId) {
  return shifts.filter(shift => shift.employeeId === employeeId);
}

// Get all shifts for a particular date
function getShiftsForDate(date) {
  return shifts.filter(shift => shift.date === date);
}

// Find an employee by ID
function getEmployee(id) {
  return employees.find(employee => employee.id === id);
}

// Make the data available to the page
window.Flexrota = {
  employees,
  shifts,
  addEmployee,
  removeEmployee,
  addShift,
  editShift,
  deleteShift,
  respondToShift,
  getEmployeeShifts,
  getShiftsForDate,
  getEmployee,
  saveData
};

console.log("Flexrota app loaded successfully.");
