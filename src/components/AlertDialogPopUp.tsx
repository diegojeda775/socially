"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { Loader2Icon, LucideProps, Trash2Icon, Component } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

interface AlertDialogProps {
  onClickFn: () => Promise<void>;
  isBusy: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonBgColor?: string;
  buttonIcon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

function AlertDialogPopUp(props: AlertDialogProps) {
  const { 
    onClickFn, 
    title = "Dialog Title",
    description = "This acction cannot be undone.",
    buttonText = "Next",
    buttonIcon: Icon = Component,
    buttonBgColor = "blue-600", 
    isBusy } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-muted-foreground hover:text-${buttonBgColor} -mr-2`}
        >
          {isBusy ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Icon className="size-4"/>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
           {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onClickFn}
            className={`bg-${buttonBgColor} hover:bg-${buttonBgColor}`}
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogPopUp