"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import {zodResolver} from "@hookform/resolvers/zod"
import axios from "axios"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1)
});

export const StoreModal = () => {
    const StoreModal = useStoreModal();

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async ( values: z.infer<typeof formSchema>) => {
      try{
        setLoading(true)
        
        const response = await axios.post("/api/stores", values)
        
       window.location.assign(`/${response.data.id}`)
      }catch(error){
        toast.error("Something went wrong")
      }finally{
        setLoading(false);
      }
    }

    return (
    <Modal
        title="create store"
        description="Add a new store to manage products and categories"
        isOpen={StoreModal.isOpen}
        onClose={StoreModal.onClose}
    >
        <div>
            <div className="py-2 pb-4 space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                          control={form.control}
                          name="name"
                          render={({field}) =>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                      placeholder="e-commerce"
                                      {...field}
                                      disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                          )}
                          />

                          <div className="flex items-center justify-end w-full pt-6 space-x-2">
                            <Button 
                             variant="outline" 
                             onClick={StoreModal.onClose}
                             disabled={loading}
                             >
                                Cancel
                            </Button>
                            <Button 
                             type="submit"
                             disabled={loading}
                             >
                                Continue
                              </Button>
                          </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    )

}


 





























