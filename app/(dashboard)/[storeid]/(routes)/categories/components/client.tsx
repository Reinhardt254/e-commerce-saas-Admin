"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();
    
  return (
    <>
    <div className="flex items-center justify-between">
       <Heading 
         title={`Categories (${data.length})`}
         description="Manage Categories for your store"
       />
       <Button onClick={()=>router.push(`/${params.storeid}/categories/new`)}>
         <Plus />
         Add New
       </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading title="API" description="Api calls for Categories"/>
    <Separator />
    <ApiList 
      entityName="categories"
      entityIdName="categoryId"
    />
    </>
  )
}

