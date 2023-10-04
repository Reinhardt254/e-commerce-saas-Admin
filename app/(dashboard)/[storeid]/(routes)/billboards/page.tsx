import prismadb from "@/lib/prismadb";
import {BillBoardClient} from "./components/client"
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns"


const BillBoardsPage = async ({
  params
}: {params: {storeid: string}}) => {
  
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid
    }, 
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className="flex-col">
       <div className="flex-1 p-8 pt-6 space-y-4">
        <BillBoardClient data={formattedBillboards}/>
       </div>
    </div>
  )
}

export default BillBoardsPage;

