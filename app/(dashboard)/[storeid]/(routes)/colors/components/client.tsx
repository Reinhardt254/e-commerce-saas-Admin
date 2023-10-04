"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorsClient: React.FC<ColorClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();
    
  return (
    <>
    <div className="flex items-center justify-between">
       <Heading 
         title={`Colors (${data.length})`}
         description="Manage Colors for your store"
       />
       <Button onClick={()=>router.push(`/${params.storeid}/colors/new`)}>
         <Plus />
         Add New
       </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading title="API" description="Api calls for Colors"/>
    <Separator />
    <ApiList 
      entityName="colors"
      entityIdName="colorId"
    />
    </>
  )
}

