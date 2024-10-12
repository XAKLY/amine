import React, { useState,useRef } from "react";
import { File, PlusCircle, ListFilter, MoreVertical } from "lucide-react"; // MoreVertical icon
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SheetSearchFunc } from "./sheetSearchFunc";
import { ClientForm } from "../pages/ClientForm"; // Import the ClientForm
import { FourFrom } from "../pages/fourFrom"; // Import the ClientForm
import { background, border } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';



// Sortable column component
function SortableColumn({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // Disable transition during drag
    opacity: isDragging ? 0 : 1, // Optional: Change opacity while dragging
  };
  
  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab ${isDragging ? 'dragging' : ''}`} // Add dragging class for styling if needed
    >
      {children}
    </TableHead>
  );
}

// TableDemo component with addButton prop
export function TableDemo({ addButton, addClient,addfour }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showClientForm, setShowClientForm] = useState(false); // State for client form visibility
  const [showfourForm, setShowfourForm] = useState(false); // State for client form visibility
  const [columns, setColumns] = useState(["Name", "Status", "Price"]); // Added "#" for row number
  const [visibleColumns, setVisibleColumns] = useState({

    Name: true,
    Status: true,
    Price: true,
    Action: true,
  });

  // Sample data for table rows
  const [rowData, setRowData] = useState([
    { name: "Luminous VR Headset", status: "Active", price: "$199.99", },
    { name: "Virtual Reality Game", status: "Draft", price: "$49.99" },
    { name: "Gaming Console", status: "Active", price: "$399.99" },
    { name: "Luminous VR Headset", status: "Active", price: "$199.99" },
    { name: "Virtual Reality Game", status: "Draft", price: "$49.99" },
    { name: "Gaming Console", status: "Active", price: "$399.99" },
  ]);

  const rowRefs = useRef([]);

  const [searchTerm, setSearchTerm] = useState("");


  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editColumn, setEditColumn] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page


  const handleRowSelect = (index) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((row) => row !== index)
        : [...prevSelectedRows, index]
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColumns((prevColumns) => {
        const oldIndex = prevColumns.indexOf(active.id);
        const newIndex = prevColumns.indexOf(over.id);
        return arrayMove(prevColumns, oldIndex, newIndex);
      });
    }
  };

  const handleDoubleClick = (rowIndex, column) => {
    setEditRowIndex(rowIndex);
    setEditColumn(column);
  };

  const handleEditChange = (e, rowIndex, column) => {
    const newRowData = [...rowData];
    newRowData[rowIndex][column.toLowerCase()] = e.target.value;
    setRowData(newRowData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Always use filteredRows or rowData as needed for pagination
  const currentItems = rowData.slice(indexOfFirstItem, indexOfLastItem);

  const filteredRows = rowData.filter(row =>
    columns.some(column =>
      visibleColumns[column] && row[column.toLowerCase()].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Toggle visibility of columns
  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };
  
  // Add a new row to rowData
  const addNewRow = () => {
    const newRow = { name: "", status: "", price: "" };
  
    setRowData((prevRowData) => {
      const updatedRowData = [newRow, ...prevRowData]; // Add new row at the beginning
  
      const newRowIndex = 0; // The new row is at index 0
  
      // Recalculate pagination if the new row is not on the current page
      if (newRowIndex < indexOfFirstItem || newRowIndex >= indexOfLastItem) {
        const newPage = Math.floor(newRowIndex / itemsPerPage) + 1;
        setCurrentPage(newPage); // Set the current page to the page containing the new row
      }
  
      // Update references for the new row
      rowRefs.current.unshift(React.createRef()); // Add a reference for the new row
  
      // Scroll to the new row after a short delay
      setTimeout(() => {
        if (rowRefs.current[0] && rowRefs.current[0].current) {
          rowRefs.current[0].current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);
  
      return updatedRowData; // Return the updated row data
    });
  
    // Optional: Automatically focus on the last row added
    setTimeout(() => {
      const lastRow = document.querySelector("tr:last-child input");
      if (lastRow) lastRow.focus();
    }, 0);
  };

  const handleSort = (column, order) => {
    // Implement your sorting logic here
    const sortedData = [...rowData].sort((a, b) => {
      if (order === 'asc') {
        return a[column.toLowerCase()] > b[column.toLowerCase()] ? 1 : -1;
      }
      return a[column.toLowerCase()] < b[column.toLowerCase()] ? 1 : -1;
    });
    setRowData(sortedData); // Update your state with sorted data
  };
  
  const handleEditSubmit = () => {
    setEditRowIndex(null);
    setEditColumn(null);
  };

  const handleDelete = (rowIndex) => {
    setRowData(rowData.filter((_, index) => index !== rowIndex));
  };

  const exportToExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet
    const wsData = [
      columns.filter(col => visibleColumns[col]), // Header row
      ...rowData.map(row => columns.filter(col => visibleColumns[col]).map(col => row[col.toLowerCase()]))
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // Export the workbook to Excel
    const excelFile = XLSX.writeFile(wb, 'products.xlsx');
  };



  return (
    <div className="flex w-full flex-col bg-muted/40">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <SheetSearchFunc />
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column}
                    checked={visibleColumns[column]}
                    onCheckedChange={() => toggleColumnVisibility(column)}
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={exportToExcel}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
            {addButton && (
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
              </Button>
            )}
            {addClient && (
              <Button size="sm" className="h-8 gap-1" onClick={() => setShowClientForm(true)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter un client</span>
              </Button>
            )}
            {addfour && (
              <Button size="sm" className="h-8 gap-1" onClick={() => setShowfourForm(true)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter un fournisseur</span>
              </Button>
            )}
          </div>
        </div>
  
        {/* Client Form Modal */}
        {showClientForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <ClientForm onClose={() => setShowClientForm(false)} />
          </div>
        )}
        {showfourForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <FourFrom onClose={() => setShowfourForm(false)} />
          </div>
        )}
  
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
  
            <Button
              onClick={addNewRow} // Appelle la fonction qui ajoutera une nouvelle ligne
              variant="primary" // Couleur du bouton
              className="ml-1 active:scale-95 transition duration-200 ease-in-out flex items-center justify-start"
            >
              + Ajouter une ligne
            </Button>
            <br />
            <CardContent>
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={columns} strategy={verticalListSortingStrategy}>
                  <Table className="stripped">
                  <TableHeader>
  <TableRow>
    <TableHead
      className="w-[50px]"
      style={{
        color: 'white',
        background: 'white',
        border: 'none',
        width: '50px',
        textAlign: 'center',
        padding: '0rem',
      }}
    >
    </TableHead>

    {/* Checkbox for selecting all rows */}
    <TableHead className="w-[50px] sticky-col">
      <Checkbox
        checked={selectedRows.length === rowData.length}
        onCheckedChange={(checked) => {
          if (checked) {
            const allRows = rowData.map((_, index) => index);
            setSelectedRows(allRows);
          } else {
            setSelectedRows([]);
          }
        }}
      />
    </TableHead>

    {columns.map((column) => (
      visibleColumns[column] && (
        <TableHead key={column}>
          <div className="flex items-center justify-between">
            <span className="custom-header-text">{column}</span>
            {/* Dropdown for sorting and searching */}
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <ChevronDown className="h-4 w-4" /> {/* Remplacer l'icône */}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
    <DropdownMenuItem
      onMouseDown={(e) => e.preventDefault()} // Empêcher le menu de se fermer
      onClick={() => handleSort(column, 'asc')}
    >
      Ascending
    </DropdownMenuItem>
    <DropdownMenuItem
      onMouseDown={(e) => e.preventDefault()} // Empêcher le menu de se fermer
      onClick={() => handleSort(column, 'desc')}
    >
      Descending
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>
      Search <br /> 
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-1 rounded-md"
      />
    </DropdownMenuLabel>
  </DropdownMenuContent>
</DropdownMenu>
          </div>
        </TableHead>
      )
    ))}
  </TableRow>
</TableHeader>
  
<TableBody>
{filteredRows.slice(indexOfFirstItem, indexOfLastItem).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell style={{ position: 'sticky', left: -2, background: '#cce2fe',color:'#1e40af',border: '1px solid #82b0ec', zIndex: 0, width: '50px', textAlign: 'center', padding: '0rem' }}>
  {indexOfFirstItem + rowIndex + 1}
</TableCell>
                          {/* Checkbox for selection */}
                          <TableCell className="w-[50px]">
                            <Checkbox
                              checked={selectedRows.includes(indexOfFirstItem + rowIndex)}
                              onCheckedChange={() => handleRowSelect(indexOfFirstItem + rowIndex)}
                            />
                          </TableCell>
  
                          {/* Display row number */}
                          
  
                          {/* Display dynamic columns */}
                          {columns.map((column) => (
                            visibleColumns[column] && (
                              <TableCell
                                key={column}
                                onDoubleClick={() => handleDoubleClick(indexOfFirstItem + rowIndex, column)}
                              >
                                {editRowIndex === indexOfFirstItem + rowIndex && editColumn === column ? (
                                  <input
                                    value={row[column.toLowerCase()]}
                                    onChange={(e) => handleEditChange(e, indexOfFirstItem + rowIndex, column)}
                                    onBlur={handleEditSubmit}
                                    autoFocus
                                  />
                                ) : (
                                  row[column.toLowerCase()]
                                )}
                              </TableCell>
                            )
                          ))}
  
                          {/* Actions column with dropdown menu */}
                          <TableCell className="w-[100px] text-center"  style={{ width: '0px', textAlign: 'center', padding: '0.5rem',position: 'sticky', right: -1, background: '#cce2fe',color:'#1e40af',border: '1px solid #82b0ec', zIndex: 0 }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log('Modify')}>
              Modify
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(indexOfFirstItem + rowIndex)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </SortableContext>
              </DndContext>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{indexOfFirstItem + 1}-{indexOfLastItem > rowData.length ? rowData.length : indexOfLastItem}</strong> of <strong>{rowData.length}</strong> products
                </div>
                <div className="flex items-center">
                  {/* Selector for items per page */}
                  <label className="mr-2 p-2">Items per page:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border rounded-md p-1"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                {/* Previous Button */}
                <Button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  variant="outline"
                  disabled={currentPage === 1}
                  className="h-8 w-8 flex items-center justify-center rounded-md"
                >
                  &lt; {/* You can use an icon here if you prefer */}
                </Button>
  
                {/* Pagination buttons */}
                {[...Array(Math.ceil(rowData.length / itemsPerPage)).keys()].map((number) => (
                  <Button
                    key={number}
                    onClick={() => setCurrentPage(number + 1)}
                    variant={number + 1 === currentPage ? "primary" : "outline"}
                    className={`h-6 px-3 rounded-md transition duration-200 ease-in-out ${number + 1 === currentPage ? 'bg-black text-white' : 'hover:bg-gray-200 hover:text-black'}`}
                  >
                    {number + 1}
                  </Button>
                ))}
  
                {/* Next Button */}
                <Button
                  onClick={() => setCurrentPage(currentPage < Math.ceil(rowData.length / itemsPerPage) ? currentPage + 1 : currentPage)}
                  variant="outline"
                  disabled={currentPage === Math.ceil(rowData.length / itemsPerPage)}
                  className="h-8 w-8 flex items-center justify-center rounded-md"
                >
                  &gt; {/* You can use an icon here if you prefer */}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
  
}  