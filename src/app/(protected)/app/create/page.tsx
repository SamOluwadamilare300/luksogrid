"use client"

import { useState } from "react"
import { SignalCreationForm } from "@/components/signal-creation-form"
import { CreateBlockchainSignalForm } from "@/components/create-blockchain-signal-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateSignalPage() {
  const [activeTab, setActiveTab] = useState("app")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Signal</h1>
      <p className="text-muted-foreground">
        Share your trading insights with the LUKSO community. Your signals are tied to your Universal Profile and
        contribute to your reputation.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app">App Signal</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Signal</TabsTrigger>
        </TabsList>
        <TabsContent value="app" className="mt-6">
          <SignalCreationForm />
        </TabsContent>
        <TabsContent value="blockchain" className="mt-6">
          <CreateBlockchainSignalForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
