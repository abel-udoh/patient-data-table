import { useState, useEffect } from 'react';
import { usePatientStore } from './store/store.js';

const PatientModal = ({ patient, onClose, viewMode = false }) => {
  const { addPatient, updatePatient } = usePatientStore();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    diagnosis: '',
    admissionDate: new Date().toISOString().split('T')[0]
  });

  // Initialize form data
  useEffect(() => {
    if (patient) {
      setFormData({
        id: patient.id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        diagnosis: patient.diagnosis,
        admissionDate: patient.admissionDate,
      });
    } else {
      // Reset to empty form when adding new patient
      setFormData({
        id: Math.random().toString(36).substring(2, 9),
        name: '',
        age: '',
        gender: '',
        diagnosis: '',
        admissionDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode) {
      onClose();
      return;
    }

    if (patient?.id) {
      updatePatient(patient.id, formData);
    } else {
      addPatient(formData);
    }
    onClose();
  };

  // Field configuration for dynamic rendering
  const fields = [
    { name: 'name', label: 'Patient Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number', min: 0 },
    { 
      name: 'gender', 
      label: 'Gender', 
      type: 'select',
      options: ['', 'Male', 'Female', 'Other']
    },
    { name: 'diagnosis', label: 'Diagnosis', type: 'text' },
    { name: 'admissionDate', label: 'Admission Date', type: 'date' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {viewMode ? 'View Patient' : patient?.id ? 'Edit Patient' : 'Add Patient'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {viewMode ? (
                  <p className="mt-1 p-2 bg-gray-100 rounded">
                    {formData[field.name] || 'N/A'}
                  </p>
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required={!viewMode}
                    disabled={viewMode}
                  >
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option || 'Select'}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required={!viewMode}
                    disabled={viewMode}
                    min={field.min}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {viewMode ? 'Close' : 'Cancel'}
            </button>
            {!viewMode && (
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {patient?.id ? 'Save Changes' : 'Add Patient'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;