/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PatientDialog({ text }: { text: string }) {
  const [date, setDate] = useState<Date>();
  return (
    <form action="">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            color="primary"
            className="bg-blue-600 text-white px-4 py-6 rounded-3xl">
            <Plus />
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
            <DialogDescription className="text-gray-700 text-md">
              Create an appointment. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name
              </Label>
              <Input id="fullName" className="col-span-2 md:col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" className="col-span-2 md:col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <select
                id="gender"
                className="col-span-2 md:col-span-3 py-2 rounded-md">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right ">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal col-span-2 md:col-span-3",
                      !date && "text-muted-foreground"
                    )}>
                    <CalendarIcon />
                    {date ? (
                      // @ts-expect-error
                      format<Date>(date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Time
              </Label>
              <Input
                id="gender"
                type="time"
                className="col-span-2 md:col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Doctor
              </Label>
              <select className="p-2 col-span-2 md:col-span-3 rounded-md">
                <option value="">Select a doctor</option>
                <option value="Dr. John Doe">Dr. John Doe</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-900">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
