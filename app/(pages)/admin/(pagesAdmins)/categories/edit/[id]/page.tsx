"use client"
import EditCategoryPage from "@/app/components/admins/categoryComponents/categoriesEdit";
import { useParams } from "next/navigation";
export default function Page() {
  const params = useParams();
  return (
    <EditCategoryPage id={params.id}/>
  )
}