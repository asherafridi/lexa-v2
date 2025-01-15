import React, { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useAllCallFetch } from "@/hooks/singleCallHook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

// Define types for call data
interface Call {
  from?: string;
  created_at?: string;
  summary?: string;
}

const RecentActivity: React.FC = () => {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { queryParams } = useMemo(() => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 2000 * 60 * 60 * 1000);

    const formatDate = (date: Date): string =>
      new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

    return {
      queryParams: {
        inbound: true,
        batch: "",
        start_date: formatDate(oneDayAgo),
        end_date: formatDate(now),
      },
    };
  }, []);

  const { call, callLoader } = useAllCallFetch(queryParams);

  const handleItemClick = (activity: Call) => {
    setSelectedCall(activity);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedCall(null); // Clear the selected call when the dialog is closed
    setTimeout(() => {
      document.getElementsByTagName("body")[0].style.pointerEvents = "auto";
    }, 500);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "No date provided";

    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust toLocaleString options for specific formatting
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-100 px-4 rounded-lg">
          <Bell />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] h-[520px] overflow-y-scroll">
          <DropdownMenuLabel>Recent Activity</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {callLoader ? (
            <DropdownMenuItem>Loading recent activities...</DropdownMenuItem>
          ) : call && call.length > 0 ? (
            call.map((activity: Call, index: number) => (
              <DropdownMenuItem
                key={index}
                className="focus:bg-gray-200 cursor-pointer"
                onClick={() => handleItemClick(activity)}
              >
                <div>
                  <p className="font-semibold">{activity.from || "Unknown Caller"}</p>
                  <p className="text-sm text-gray-500">{formatDate(activity.created_at)}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem>No recent activity found.</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog for showing call summary */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Summary</DialogTitle>
            <DialogDescription>Details for the selected call.</DialogDescription>
          </DialogHeader>
          {selectedCall && (
            <div className="mt-4">
              <p>
                <strong>From:</strong> {selectedCall.from || "Unknown Caller"}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedCall.created_at)}
              </p>
              <p>
                <strong>Summary:</strong> {selectedCall.summary || "No summary available"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecentActivity;
