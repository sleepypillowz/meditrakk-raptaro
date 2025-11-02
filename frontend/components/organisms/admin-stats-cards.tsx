"use client";

import {
  FaUser,
  FaUserClock,
  FaCodePullRequest,
  FaClockRotateLeft,
  FaEllipsis,
} from "react-icons/fa6";
import { FiChevronsDown } from "react-icons/fi";
import { useApiQuery } from "@/hooks/use-api-query";

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  footer: {
    text: string;
    highlight?: string;
    trend?: {
      value: string | number;
      isPositive: boolean;
    };
  };
}

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

function StatsCard({ icon: Icon, title, value, footer }: StatsCardProps) {
  return (
    <div className="card block w-full max-w-sm space-y-2 rounded-xl border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="me-2 text-primary" />
          <p className="text-lg tracking-tight">{title}</p>
        </div>
        <FaEllipsis className="me-2 opacity-0 lg:opacity-100" />
      </div>

      <p className="text-3xl font-bold">{value}</p>

      <p className="flex items-center justify-center md:justify-normal">
        {footer.trend && (
          <>
            <span
              className={
                footer.trend.isPositive ? "text-green-500" : "text-red-500"
              }
            >
              <FiChevronsDown
                className={footer.trend.isPositive ? "rotate-180" : ""}
              />
            </span>
            <span
              className={`me-1 ${
                footer.trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {footer.trend.value}
            </span>
          </>
        )}
        {footer.highlight && (
          <span className="pe-2 text-blue-500"> {footer.highlight}</span>
        )}
        {footer.text}
      </p>
    </div>
  );
}

export default function AdminStatsCards() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  const {
    data: patients,
    isLoading,
    error,
  } = useApiQuery<User[]>(["patients"], `${baseUrl}/user/users/?role=patient`, {
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

  const patientCount = patients?.length ?? 0;

  const statsData: StatsCardProps[] = [
    {
      icon: FaUser,
      title: "Total Patients",
      value: patientCount,
      footer: {
        text: "Since last week",
        trend: {
          value: "+3",
          isPositive: true,
        },
      },
    },
    {
      icon: FaUserClock,
      title: "Today's Appointments",
      value: 12,
      footer: {
        text: "Next Appointment",
        highlight: "10:00 AM",
      },
    },
    {
      icon: FaCodePullRequest,
      title: "Patient Requests",
      value: 10,
      footer: {
        text: "Appointment Request",
        highlight: "+2",
      },
    },
    {
      icon: FaClockRotateLeft,
      title: "Inventory Updates",
      value: 4,
      footer: {
        text: "Low stock items",
        trend: {
          value: "-1",
          isPositive: false,
        },
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 place-items-center gap-4 text-card-foreground md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
