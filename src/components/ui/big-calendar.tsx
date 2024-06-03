import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Calendar, dateFnsLocalizer, CalendarProps } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export type BigCalendarProps = Omit<CalendarProps, "localizer"> & {
  localizer?: CalendarProps['localizer']
}


const locales = {
  es: es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


function BigCalendar({
  className,


  ...props
}: BigCalendarProps) {
  return (
    <Calendar
      localizer={localizer}
      /*  components={{
         toolbar: (x) => (
           <div>
             <ToggleGroup type="single" defaultValue="bold">
               <ToggleGroupItem value="bold">
 
                 Mes
 
               </ToggleGroupItem>
               <ToggleGroupItem value="italic">
 
                 <FontItalicIcon />
 
               </ToggleGroupItem>
               <ToggleGroupItem value="underline">
 
                 <UnderlineIcon />
 
               </ToggleGroupItem>
             </ToggleGroup>
           </div>
         ),
 
       }} */
      {...props}

    />
  )
}
BigCalendar.displayName = "BigCalendar"

export { BigCalendar }
