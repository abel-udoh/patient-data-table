import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Initial data
const initialPatients = [
  {
    id: 1,
    name: 'Peter Fred',
    age: 55,
    gender: 'Male',
    diagnosis: 'Low Sperm Count',
    admissionDate: '2024-05-15'
  },
  {
    id: 2,
    name: 'Hope Theophilus',
    age: 32,
    gender: 'Female',
    diagnosis: 'Tubaculosis',
    admissionDate: '2022-06-20'
  },
  {
    id: 3,
    name: 'Matthew Philip',
    age: 22,
    gender: 'Male',
    diagnosis: 'Malaria',
    admissionDate: '2025-06-10'
  },
  {
    id: 4,
    name: 'Happiness Sam',
    age: 42,
    gender: 'Female',
    diagnosis: 'Fibroid',
    admissionDate: '2025-03-26'
  },
  {
    id: 5,
    name: 'Joy Peter',
    age: 52,
    gender: 'Female',
    diagnosis: 'Hypertension',
    admissionDate: '2024-06-24'
  },
  {
    id: 6,
    name: 'Donatus Jacob',
    age: 37,
    gender: 'Male',
    diagnosis: 'Typhoid',
    admissionDate: '2023-10-02'
  },
  {
    id: 7,
    name: 'Titus Ubon',
    age: 48,
    gender: 'Male',
    diagnosis: 'Headache',
    admissionDate: '2024-12-10'
  },
  {
    id: 7,
    name: 'Peace Leo',
    age: 22,
    gender: 'Female',
    diagnosis: 'Tubaculosis',
    admissionDate: '2025-04-20'
  },
  {
    id: 8,
    name: 'Brown Dril',
    age: 30,
    gender: 'Male',
    diagnosis: 'Hunger',
    admissionDate: '2021-12-22'
  },
  {
    id: 9,
    name: 'Felix Tom',
    age: 62,
    gender: 'Male',
    diagnosis: 'Diabetes',
    admissionDate: '2023-11-07'
  },
  {
    id: 10,
    name: 'Monday Solomon',
    age: 72,
    gender: 'Male',
    diagnosis: 'Tubaculosis',
    admissionDate: '2023-08-24'
  },
];

export const usePatientStore = create((set) => ({
  patients: initialPatients,
  
 
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

  // Optional: Get single patient
  getPatient: (id) => {
    return initialPatients.find(patient => patient.id === id);
  }
}));