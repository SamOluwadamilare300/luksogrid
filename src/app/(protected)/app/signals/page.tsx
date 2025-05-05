import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlockchainSignalsList } from "@/components/blockchain-signals-list"
import { SignalList } from "@/components/signal-list"
import { SignalFilters } from "@/components/signal-filters"
import { getSignals, getUniqueAssets, getUniqueActions, getUniqueTimeframes } from "@/app/actions/signals"
import { Plus } from "lucide-react"
import { FilterOptions } from "@/types"
import { Suspense } from "react"

interface SignalPageProps {
  searchParams: {
    asset?: string
    action?: string
    timeframe?: string
    search?: string
  }
}

async function SignalListContainer({ filters }: { filters?: FilterOptions }) {
  const signals = await getSignals(filters)
  return <SignalList signals={signals} />
}

async function FilterContainer() {
  const assets = await getUniqueAssets()
  const actions = await getUniqueActions()
  const timeframes = await getUniqueTimeframes()

  return <SignalFilters assets={assets} actions={actions} timeframes={timeframes} />
}

export default function SignalsPage({ searchParams }: SignalPageProps) {
  const filters: FilterOptions = {
    asset: searchParams.asset,
    action: searchParams.action,
    timeframe: searchParams.timeframe,
    search: searchParams.search,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Signal Feed</h1>
        <Link href="/app/signals/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Signal
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="app" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app">App Signals</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Signals</TabsTrigger>
        </TabsList>
        
        {/* App Signals Tab */}
        <TabsContent value="app" className="mt-6 space-y-6">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterContainer />
          </Suspense>
          <Suspense fallback={<div>Loading signals...</div>}>
            <SignalListContainer filters={filters} />
          </Suspense>
        </TabsContent>
        
        {/* Blockchain Signals Tab */}
        <TabsContent value="blockchain" className="mt-6">
          <Suspense fallback={<div>Loading blockchain signals...</div>}>
            <BlockchainSignalsList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}