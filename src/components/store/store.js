import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Initial data
const initialPatients = [
  {
    id: uuidv4(),
    name: 'Peter Fred',
    age: 55,
    gender: 'Male',
    diagnosis: 'Low Sperm Count',
    admissionDate: '2024-05-15'
  },
  {
    id: uuidv4(),
    name: 'Hope Theophilus',
    age: 32,
    gender: 'Female',
    diagnosis: 'Tubaculosis',
    admissionDate: '2022-06-20'
  },
  {
    id: uuidv4(),
    name: 'Matthew Philip',
    age: 22,
    gender: 'Male',
    diagnosis: 'Malaria',
    admissionDate: '2025-06-10'
  },
  {
    id: uuidv4(),
    name: 'Happiness Sam',
    age: 42,
    gender: 'Female',
    diagnosis: 'Fibroid',
    admissionDate: '2025-03-26'
  },
  {
    id: uuidv4(),
    name: 'Joy Peter',
    age: 52,
    gender: 'Female',
    diagnosis: 'Hypertension',
    admissionDate: '2024-06-24'
  },
  {
    id: uuidv4(),
    name: 'Donatus Jacob',
    age: 37,
    gender: 'Male',
    diagnosis: 'Typhoid',
    admissionDate: '2023-10-02'
  },
  {
    id: uuidv4(),
    name: 'Titus Ubon',
    age: 48,
    gender: 'Male',
    diagnosis: 'Headache',
    admissionDate: '2024-12-10'
  },
  {
    id: uuidv4(),
    name: 'Peace Leo',
    age: 22,
    gender: 'Female',
    diagnosis: 'Tubaculosis',
    admissionDate: '2025-04-20'
  },
  {
    id: uuidv4(),
    name: 'Brown Dril',
    age: 30,
    gender: 'Male',
    diagnosis: 'Hunger',
    admissionDate: '2021-12-22'
  },
  {
    id: uuidv4(),
    name: 'Felix Tom',
    age: 62,
    gender: 'Male',
    diagnosis: 'Diabetes',
    admissionDate: '2023-11-07'
  },
  {
    id: uuidv4(),
    name: 'Monday Solomon',
    age: 72,
    gender: 'Male',
    diagnosis: 'Tubaculosis',
    admissionDate: '2023-08-24'
  },
];

export const usePatientStore = create((set) => ({
  patients: initialPatients,
  
  // Add new patient with validation
  addPatient: (patient) => set((state) => {
    if (!patient.name || !patient.diagnosis) {
      console.warn('Patient must have name and diagnosis');
      return state;
    }
    return { 
      patients: [...state.patients, { 
        ...patient,
        id: patient.id || uuidv4(), // Ensure ID exists
        admissionDate: patient.admissionDate || new Date().toISOString().split('T')[0]
      }] 
    };
  }),
  
  // Update patient with validation
  updatePatient: (id, updatedPatient) => set((state) => ({
    patients: state.patients.map(patient => 
      patient.id === id ? { 
        ...patient, 
        ...updatedPatient,
        // Prevent overriding critical fields with empty values
        name: updatedPatient.name || patient.name,
        diagnosis: updatedPatient.diagnosis || patient.diagnosis
      } : patient
    )
  })),
  
  // Delete patient
  deletePatient: (id) => set((state) => ({
    patients: state.patients.filter(patient => patient.id !== id)
  })),
  
  // Optional: Get single patient
  getPatient: (id) => {
    return initialPatients.find(patient => patient.id === id);
  }
}));