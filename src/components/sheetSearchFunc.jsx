import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Button } from "@/components/ui/button"; // Button component import
  import { Search } from "lucide-react"; // Icon import
  import { useState } from "react"; // For state management
  
  export function SheetSearchFunc() {
    // State variables for search inputs
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("name");
    const [comparisonOperator, setComparisonOperator] = useState("=");
    const [searchValue, setSearchValue] = useState("");
  
    // Function to handle search action
    const handleSearch = () => {
      // Implement your search logic here based on selectedColumn, comparisonOperator, and searchValue
      console.log({
        searchQuery,
        selectedColumn,
        comparisonOperator,
        searchValue,
      });
    };
  
    // Define available operators for different data types
    const getOperatorsForColumn = (column) => {
      if (column === "price" || column === "quantity") {
        // Numeric comparison operators
        return [
          { value: "=", label: "=" },
          { value: ">", label: ">" },
          { value: ">=", label: ">=" },
          { value: "<", label: "<" },
          { value: "<=", label: "<=" },
        ];
      } else if (column === "date") {
        // Date comparison operators
        return [
          { value: "=", label: "Exact Date" },
          { value: ">", label: "After" },
          { value: ">=", label: "On or After" },
          { value: "<", label: "Before" },
          { value: "<=", label: "On or Before" },
        ];
      } else {
        // String comparison operators
        return [
          { value: "=", label: "Exact Match" },
          { value: "contains", label: "Contains" },
          { value: "starts_with", label: "Starts with" },
          { value: "ends_with", label: "Ends with" },
        ];
      }
    };
  
    return (
      <div className="">
        {/* Right-aligned button to open the search/filter panel */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Search className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Search
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-4 w-80">
            <SheetHeader>
              <SheetTitle>Search Products</SheetTitle>
              <SheetDescription>
                Use the options below to search or filter products.
              </SheetDescription>
            </SheetHeader>
  
            <div className="space-y-4 mt-4">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search by name"
                className="border rounded p-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
  
              {/* Column selection dropdown */}
              <select
                className="border p-2 rounded w-full"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
                <option value="date">Date</option>
                {/* Add more columns as needed */}
              </select>
  
              {/* Comparison operator selection */}
              <select
                className="border p-2 rounded w-full"
                value={comparisonOperator}
                onChange={(e) => setComparisonOperator(e.target.value)}
              >
                {getOperatorsForColumn(selectedColumn).map((operator) => (
                  <option key={operator.value} value={operator.value}>
                    {operator.label}
                  </option>
                ))}
              </select>
  
              {/* Search value input */}
              <input
                type="text"
                placeholder="Enter value"
                className="border rounded p-2 w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
  
              {/* Search button */}
              <Button variant="outline" className="w-full" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
  