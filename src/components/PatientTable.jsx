import { useMemo, useState } from 'react';
import { usePatientStore } from './store/store.js';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import PatientModal from './PatientModal';

const PatientTable = () => {
  const { patients } = usePatientStore();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Patient Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'diagnosis',
      header: 'Diagnosis',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'admissionDate',
      header: 'Admission Date',
      cell: info => format(new Date(info.getValue()), 'MM/dd/yyyy'),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedPatient(info.row.original);
              setViewMode(true);
              setModalOpen(true);
            }}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            View
          </button>
          <button
            onClick={() => {
              setSelectedPatient(info.row.original);
              setViewMode(false);
              setModalOpen(true);
            }}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: patients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleAddPatient = () => {
    setSelectedPatient({
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      age: '',
      gender: '',
      diagnosis: '',
      admissionDate: new Date().toISOString().split('T')[0]
    });
    setViewMode(false);
    setModalOpen(true);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient Records</h1>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search all fields..."
          className="p-2 border rounded w-full md:w-1/2"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center cursor-pointer">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            «
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ‹
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ›
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
        
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-1 border rounded"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      
      {modalOpen && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => {
            setModalOpen(false);
            setSelectedPatient(null);
          }}
          viewMode={viewMode}
        />
      )}
    </div>
  );
};

export default PatientTable;