"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Phone,
  CheckCircle,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useFetchInsightsHook } from "@/hooks/dashboard"
import { Bar, Pie } from "react-chartjs-2"

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from "@/components/ui/skeleton"
import { signOut, useSession } from "next-auth/react"


ChartJS.register(BarElement, CategoryScale, LinearScale, PieController, ArcElement, Tooltip, Legend);

export default function Dashboard() {

  const { data: sessionData } = useSession(); // Assuming session returns an object with a data property
  const { data, loading } = useFetchInsightsHook();


  if (sessionData?.user?.key_token == null) {
    console.log('ashir');
    return <Card className="p-4">Key token is missing</Card>;
  }




  if (loading) {
    return <Skeleton className='w-full h-[400px] rounded mt-4' />;
  }


  if (!data || Object.keys(data).length === 0) {

    return (
    <>
    {!sessionData?.user?.key_token ? (
  <Card className="my-4 p-4">
    Your account is not yet verified. Please click the link below to complete the verification process.  
    <a 
      href="/verify" 
      className="text-blue-500 underline ml-2"
    >
      Verify Now
    </a>. 
    If your account is already verified, kindly log out and sign in again.
  </Card>
) : <Card className="p-4">No data available. Please try again later.</Card>}
    
    </>);
  }


  // 1. Bar Chart for Call Duration Distribution
  const barChartData = {
    labels: Object.keys(data?.insights.callDurationDistribution),
    datasets: [
      {
        label: 'Call Duration (minutes)',
        data: Object.values(data?.insights.callDurationDistribution),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 2. Pie Chart for Successful and Unsuccessful Calls
  const successfulCalls = data?.insights.completedCalls;
  const unsuccessfulCalls = data?.insights.totalCalls - successfulCalls;

  const pieChartData = {
    labels: ['Successful Calls', 'Unsuccessful Calls'],
    datasets: [
      {
        data: [successfulCalls, unsuccessfulCalls],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // 3. Pie Chart for Calls Received by Human vs. Others
  const callsReceivedByHuman = data?.insights.humanAnsweredCalls;
  const otherCalls = data?.insights.totalCalls - callsReceivedByHuman;

  const humanPieChartData = {
    labels: ['Received by Human', 'Other'],
    datasets: [
      {
        data: [callsReceivedByHuman, otherCalls],
        backgroundColor: ['#4BC0C0', '#FFCE56'],
        hoverBackgroundColor: ['#4BC0C0', '#FFCE56'],
      },
    ],
  };




  return (
    <div className="flex min-h-screen w-full flex-col">

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Calls
              </CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.totalCalls}</div>
              <p className="text-xs text-muted-foreground">
                Total calls made
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inbound Calls
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.inboundCalls}</div>
              <p className="text-xs text-muted-foreground">
                Calls received
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Calls</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.completedCalls}</div>
              <p className="text-xs text-muted-foreground">
                Successfully completed calls
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.totalCost?.toFixed(3)} $</div>
              <p className="text-xs text-muted-foreground">
                Total cost of calls
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Additional content and cards here */}


        <div className="flex gap-2 flex-col lg:flex-row">
          {/* Pie Chart for Successful and Unsuccessful Calls */}
          <Card className="w-full lg:w-1/2 flex flex-col items-center">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Call Success Rate</CardTitle>
            </CardHeader>
            <CardContent>

              <Pie data={pieChartData} />
            </CardContent>
          </Card>

          {/* Pie Chart for Calls Received by Human vs. Others */}

          <Card className="w-full lg:w-1/2 flex flex-col items-center">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Calls Received by Human</CardTitle>
            </CardHeader>
            <CardContent>

              <Pie data={humanPieChartData} />
            </CardContent>
          </Card>

        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Call Duration Distribution</CardTitle>
          </CardHeader>
          <CardContent>

            <Bar data={barChartData} options={barChartOptions} />
          </CardContent>
        </Card>


      </main>
    </div>
  )
}
