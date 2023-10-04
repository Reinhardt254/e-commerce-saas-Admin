"use client"

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
// import { UserButton } from "@clerk/nextjs";

const Home = () => {

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen])
  
  return (
    <div>
      yessss 
    </div>
  )
}

export default Home;
