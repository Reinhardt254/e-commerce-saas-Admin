"use client"

import * as z from "zod";

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/models/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";


interface SettingsFormProps {
    initialData : Store
}

const formSchema = z.object({
  name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const onSubmit = async (data: SettingsFormValues) => {
    try{
      setLoading(true)
      await axios.patch(`/api/stores/${params.storeid}`, data);
      router.refresh();
      toast.success("Store updated")
    }catch(error){
      toast.error("Something went wrong")
    }finally{
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try{
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeid}`);
      router.refresh();
      router.push("/")
      toast.success("store deleted")
    }catch(error){
      toast.error("make sure you removed all products and categories first");
    }finally{
      setLoading(false)
      setOpen(false)
    }
  }
  
  return (
  <>
    <AlertModal 
      isOpen = {open}
      onClose = {()=>setOpen(false)}
      onConfirm = {onDelete}
      loading= {loading}
    />
    <div className="flex items-center justify-between"> 
      <Heading 
        title="Settings"
        description="manage store preferences"
      />
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={()=>setOpen(true)}
      >
        <Trash className="w-4 h-4"/>
      </Button>
    </div>
    <Separator />

    <Form {...form}>
      <form 
         onSubmit={form.handleSubmit(onSubmit)} 
         className="w-full space-y-8"
       >
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading}
                    placeholder= "Store name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> 
        <Button disabled={loading} className="ml-auto" type="submit">
          Save changes
        </Button>     
      </form>
    </Form>
    <Separator />
    
    <ApiAlert 
      title="NEXT_PUBLIC_API_URL"
      description= {`${origin}/api/${params.storeid}`}
      variant="public"
    />
  </>
  )
}

export default SettingsForm

