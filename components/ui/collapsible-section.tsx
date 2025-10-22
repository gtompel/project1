"use client";
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  className = ""
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-center p-4 md:p-0 md:justify-start md:bg-transparent hover:bg-muted/50 md:hover:bg-transparent"
        >
          <div className="md:hidden">
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 md:px-0 pb-4 md:pb-0">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
