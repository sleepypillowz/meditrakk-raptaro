"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/app/types";
import { formatDate } from "@/utils/date";

export const PatientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => formatDate(getValue() as Date | null),
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "barangay",
    header: "Barangay",
  },
];
