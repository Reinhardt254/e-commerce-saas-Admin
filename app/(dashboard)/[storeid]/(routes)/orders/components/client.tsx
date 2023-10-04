"use client"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {  OrderColumn, Columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
  data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();
    
  return (
  <>
    <Heading 
         title={`Orders (${data.length})`}
         description="Manage Orders for your store"
    />
    <Separator />
    <DataTable searchKey="products" columns={Columns} data={data}/>
  </>
  )
}

