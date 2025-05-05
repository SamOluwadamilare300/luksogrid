"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { IconChevronDown, IconSearch, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CryptoDetailSheet } from "@/components/crypto-detail-sheet"
import { CryptoDataService, formatMarketCap, formatNumber, formatPercent } from "@/lib/crypto-data"
import type { CryptoData } from "@/lib/crypto-data"

export function CryptoTable() {
  const [cryptos, setCryptos] = React.useState<CryptoData[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "marketCap", desc: true }])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    volume: false,
    rank: false,
  })
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCrypto, setSelectedCrypto] = React.useState<CryptoData | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  // Fetch top cryptocurrencies data
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)
      try {
        const topCryptos = await CryptoDataService.getTopCryptos()
        if (topCryptos.length === 0) {
          setError("No cryptocurrency data available")
        } else {
          setCryptos(topCryptos)
        }
      } catch (error) {
        console.error("Failed to fetch top cryptocurrencies:", error)
        setError("Failed to load cryptocurrency data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCryptoClick = (crypto: CryptoData) => {
    setSelectedCrypto(crypto)
    setSheetOpen(true)
  }

  const columns: ColumnDef<CryptoData>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => <div className="text-center">{row.getValue("rank")}</div>,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({ row }) => (
        <div
          className="cursor-pointer font-medium hover:text-primary hover:underline"
          onClick={() => handleCryptoClick(row.original)}
        >
          {row.getValue("symbol")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => <div className="text-right font-medium">${(row.getValue("price") as number).toFixed(2)}</div>,
    },
    {
      accessorKey: "changePercent",
      header: () => <div className="text-right">24h Change</div>,
      cell: ({ row }) => {
        const changePercent = row.getValue("changePercent") as number
        const isPositive = changePercent > 0

        return (
          <div className={`flex items-center justify-end gap-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
            <span>{formatPercent(changePercent)}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "volume",
      header: () => <div className="text-right">Volume (24h)</div>,
      cell: ({ row }) => <div className="text-right">${formatNumber(row.getValue("volume"))}</div>,
    },
    {
      accessorKey: "marketCap",
      header: () => <div className="text-right">Market Cap</div>,
      cell: ({ row }) => <div className="text-right">{formatMarketCap(row.getValue("marketCap"))}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-normal">
          {row.getValue("category")}
        </Badge>
      ),
    },
  ]

  const table = useReactTable({
    data: cryptos,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter: searchQuery,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId)
      if (typeof value === "string") {
        return value.toLowerCase().includes(filterValue.toLowerCase())
      }
      return false
    },
  })

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    table.setGlobalFilter(e.target.value)
  }

  if (isLoading) {
    return (
      <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
        <CardHeader>
          <CardTitle>Top Cryptocurrencies</CardTitle>
          <CardDescription>Market leaders by market capitalization</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] flex items-center justify-center">
          <p>Loading cryptocurrency data...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
        <CardHeader>
          <CardTitle>Top Cryptocurrencies</CardTitle>
          <CardDescription>Market leaders by market capitalization</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card data-[slot=card]:shadow-xs dark:data-[slot=card]:bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Top Cryptocurrencies</CardTitle>
              <CardDescription>Market leaders by market capitalization</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <IconSearch className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cryptocurrencies..."
                  className="pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <IconChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-muted-foreground text-sm">
              Showing {table.getRowModel().rows.length} of {cryptos.length} cryptocurrencies
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCrypto && <CryptoDetailSheet crypto={selectedCrypto} open={sheetOpen} onOpenChange={setSheetOpen} />}
    </>
  )
}
