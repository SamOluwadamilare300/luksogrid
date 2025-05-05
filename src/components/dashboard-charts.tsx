"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const performanceData = [
  { name: "Jan", roi: 4, signals: 5 },
  { name: "Feb", roi: 7, signals: 8 },
  { name: "Mar", roi: 5, signals: 6 },
  { name: "Apr", roi: 10, signals: 12 },
  { name: "May", roi: 8, signals: 9 },
  { name: "Jun", roi: 12, signals: 14 },
  { name: "Jul", roi: 15, signals: 18 },
]

const signalTypeData = [
  { name: "BTC", value: 35 },
  { name: "ETH", value: 25 },
  { name: "LYX", value: 20 },
  { name: "Other", value: 20 },
]

export function DashboardCharts() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roi">
          <TabsList className="mb-4">
            <TabsTrigger value="roi">ROI</TabsTrigger>
            <TabsTrigger value="signals">Signals</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="roi" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="roi" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="ROI (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="signals" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="signals" fill="#8884d8" name="Signals Created" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="assets" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={signalTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Distribution (%)" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
