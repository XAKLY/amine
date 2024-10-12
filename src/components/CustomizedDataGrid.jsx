import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// Définir les colonnes et les lignes
export const columns = [
   { field: 'id', headerName: 'ID', width: 90 },
   { field: 'wrestler', headerName: 'Wrestler', flex: 1 },
   { field: 'moves', headerName: 'Signature Move(s)', flex: 1 },
   {
       field: 'action',
       headerName: 'Actions',
       width: 150,
       renderCell: (params) => (
           <strong>
               <button onClick={() => handleEdit(params.row)}>Edit</button>
               <button onClick={() => handleDelete(params.row.id)}>Delete</button>
           </strong>
       ),
   },
];

export const rows = [
   { id: 1, wrestler: '"Stone Cold" Steve Austin', moves: 'Stone Cold Stunner, Lou Thesz Press' },
   { id: 2, wrestler: 'Bret "The Hitman" Hart', moves: 'The Sharpshooter' },
   { id: 3, wrestler: 'Razor Ramon', moves: 'Razor\'s Edge, Fallaway Slam' },
   // Ajoutez d'autres lignes si nécessaire
];

const handleEdit = (row) => {
   // Logique pour éditer la ligne
   console.log('Edit', row);
};

const handleDelete = (id) => {
   // Logique pour supprimer la ligne
   console.log('Delete', id);
};

// Composant principal
export default function CustomizedDataGrid() {
   return (
       <DataGrid
           autoHeight
           checkboxSelection
           rows={rows}
           columns={columns}
           getRowClassName={(params) =>
               params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
           }
           initialState={{
               pagination: { paginationModel: { pageSize: 20 } },
           }}
           pageSizeOptions={[10, 20, 50]}
           disableColumnResize
           density="compact"
           slotProps={{
               filterPanel: {
                   filterFormProps: {
                       logicOperatorInputProps: {
                           variant: 'outlined',
                           size: 'small',
                       },
                       columnInputProps: {
                           variant: 'outlined',
                           size: 'small',
                           sx: { mt: 'auto' },
                       },
                       operatorInputProps: {
                           variant: 'outlined',
                           size: 'small',
                           sx: { mt: 'auto' },
                       },
                       valueInputProps: {
                           InputComponentProps: {
                               variant: 'outlined',
                               size: 'small',
                           },
                       },
                   },
               },
           }}
       />
   );
}
