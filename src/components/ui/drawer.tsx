import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DrawerContentProps {
  children: React.ReactNode
  className?: string
}

interface DrawerHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DrawerTitleProps {
  children: React.ReactNode
  className?: string
}

interface DrawerDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface DrawerFooterProps {
  children: React.ReactNode
  className?: string
}

interface DrawerCloseProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children }) => {
  return (
    <>
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          
          {/* Drawer */}
          <div className={cn(
            "fixed right-0 top-0 z-50 h-full w-full transform bg-white shadow-xl transition-transform duration-300 sm:max-w-lg",
            open ? "translate-x-0" : "translate-x-full"
          )}>
            {children}
          </div>
        </>
      )}
    </>
  )
}

const DrawerContent: React.FC<DrawerContentProps> = ({ children, className }) => {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      {children}
    </div>
  )
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center justify-between border-b p-6", className)}>
      {children}
    </div>
  )
}

const DrawerTitle: React.FC<DrawerTitleProps> = ({ children, className }) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  )
}

const DrawerDescription: React.FC<DrawerDescriptionProps> = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-gray-600", className)}>
      {children}
    </p>
  )
}

const DrawerClose: React.FC<DrawerCloseProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn("rounded-md p-2 hover:bg-gray-100", className)}
    >
      {children || <X size={20} />}
    </button>
  )
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, className }) => {
  return (
    <div className={cn("border-t p-6", className)}>
      {children}
    </div>
  )
}

export {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
}