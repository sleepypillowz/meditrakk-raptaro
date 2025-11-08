import { DataTable } from "@/components/ui/data-table";
import { PatientColumns } from "./patient-columns";
import { prisma } from "@/lib/prisma";

export default async function PatientList() {
  const patients = await prisma.patient.findMany();

  return (
    <DataTable title="Patients" columns={PatientColumns} data={patients} />
  );
}
