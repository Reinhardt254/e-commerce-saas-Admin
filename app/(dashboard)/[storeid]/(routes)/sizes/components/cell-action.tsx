"use client";

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/models/alert-modal";
import { SizeColumn } from "./columns";

interface CellActionProps {
    data: SizeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard Id copied to clipboard")
    }
    
    const onDelete = async () => {
        try{
          setLoading(true)
          await axios.delete(`/api/${params.storeid}/sizes/${data.id}`);
          router.refresh();
          toast.success("Size deleted")
        }catch(error){
          toast.error("make sure you removed all products using this size first");
        }finally{
          setLoading(false)
          setOpen(false)
        }
      }

    return (
    <> 
    <AlertModal 
     isOpen={open}
     onClose={()=>setOpen(false)}
     onConfirm={onDelete}
     loading={loading}
    />
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="w-4 h-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                <Copy className="w-4 h-4 mr-2"/>
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem  
            onClick={()=> router.push(`/${params.storeid}/sizes/${data.id}`)}
            >
                <Edit className="w-4 h-4 mr-2"/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpen(true)}>
                <Trash className="w-4 h-4 mr-2"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
     </DropdownMenu>
     </> 
    )
}
