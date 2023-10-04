"use client"

import { Store } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import prismadb from "@/lib/prismadb";
import { any } from "zod";


type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {

    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter(); 

    const formattedItems = items.map((item)=>({
        label: item.name,
        value: item.id
    }));

    const currentStore = formattedItems.find((item)=>item.value === params.storeid);
    
    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: {value: string, label: string}) => {
        setOpen(false);
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="select a store"
                  className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="w-4 h-4 mr-2"/>
                     {currentStore?.label}
                    <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
             <Command>
                <CommandList>
                    <CommandInput placeholder="search store..."/>
                    <CommandEmpty>
                        No store found
                    </CommandEmpty>
                    <CommandGroup heading="Stores">
                        {formattedItems.map((store)=>(
                            <CommandItem
                              key={store.value}
                              onSelect={()=> onStoreSelect(store)}
                              className="text-sm"
                            >
                                <StoreIcon className="w-4 h-4 mr-2"/>
                                {store.label}
                                <Check
                                   className={cn(
                                    "ml-auto h-4 w-4",
                                    currentStore?.value === store.value 
                                    ? "opacity-100"
                                    : "opacity-0"
                                   )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem 
                         onSelect={()=>{
                            setOpen(false);
                            storeModal.onOpen()
                         }}
                        >
                          <PlusCircle className="w-5 h-5 mr-2"/>
                          Create Store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
             </Command>
            </PopoverContent>
        </Popover>
    )
}

