export const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'wrestler', headerName: 'Wrestler', flex: 1 },
  { field: 'moves', headerName: 'Signature Move(s)', flex: 1 },
  { 
      field: 'action', 
      headerName: 'Action', 
      width: 200, 
      renderCell: (params) => (
          <div>
              <button className="text-blue-600 hover:text-blue-800">Edit</button>
              <button className="text-red-600 hover:text-red-800 ml-2">Delete</button>
          </div>
      )
  },
];

export const rows = [
  { id: 1, wrestler: '"Stone Cold" Steve Austin', moves: 'Stone Cold Stunner, Lou Thesz Press' },
  { id: 2, wrestler: 'Bret "The Hitman" Hart', moves: 'The Sharpshooter' },
  { id: 3, wrestler: 'Razor Ramon', moves: 'Razor\'s Edge, Fallaway Slam' },
  // Add more rows as needed
];