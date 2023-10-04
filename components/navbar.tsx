import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import StoreSwitcher from './store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ModeToggle } from './theme-toggle'

const Navbar = async () => {

  const {userId} = auth();

  if(!userId){
    redirect("/sign-in")
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  });


  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-4'>
        <StoreSwitcher items={stores}/>
        <MainNav className='mx-6'/>
        <div className='flex items-center ml-auto space-x-4'>
           <ModeToggle />
           <UserButton afterSignOutUrl='/'/>   
        </div>
      </div>
    </div>
  )
}

export default Navbar






