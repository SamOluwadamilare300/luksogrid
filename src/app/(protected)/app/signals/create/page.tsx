"use client"

import { useState } from "react"
import { CreateBlockchainSignalForm } from "@/components/create-blockchain-signal-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignalCreationForm } from "@/components/signal-creation-form"
import { ArrowLeft } from "lucide-react"

export default function CreateSignalPage() {
   const [activeTab, setActiveTab] = useState("app")
   
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/app/signals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Signals
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Signal</h1>
        <p className="text-muted-foreground">Share your market insights and trading signals</p>
      </div>

      <div className="max-w-3xl mx-auto">
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
    </div>
  )
}
