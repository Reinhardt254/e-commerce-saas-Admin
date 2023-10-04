"use client"

import { cn } from "@/lib/utils"
import { Console } from "console";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export const MainNav = ({className, ...props}:
    React.HTMLAttributes<HTMLElement>) => {

        const pathname = usePathname();
        const params = useParams();

        const routes = [
        {
            href:`/${params.storeid}`,
            label: "Overview",
            active: pathname === `/${params.storeid}`
        },
        {
            href:`/${params.storeid}/billboards`,
            label: "billboards",
            active: pathname === `/${params.storeid}/billboards`
         },
         {
            href:`/${params.storeid}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeid}/categories`
         },
         {
            href:`/${params.storeid}/sizes`,
            label: "Sizes",
            active: pathname === `/${params.storeid}/sizes`
         },
         {
            href:`/${params.storeid}/colors`,
            label: "Colors",
            active: pathname === `/${params.storeid}/colors`
         },
         {
            href:`/${params.storeid}/products`,
            label: "Products",
            active: pathname === `/${params.storeid}/products`
         },
         {
            href:`/${params.storeid}/orders`,
            label: "Orders",
            active: pathname === `/${params.storeid}/orders`
         },
         {
            href:`/${params.storeid}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeid}/settings`
         }
      ]

  return ( 
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
       {routes.map((route)=>(
        <Link 
        key={route.href}
        href={route.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary", route.active? "text-black dark:text-white" : "text-muted-foreground")}
        >
            {route.label}
        </Link>     
       ))}
    </nav>
  )
}
























