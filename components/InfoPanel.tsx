import React, { useState } from 'react';
import { LevelData } from '../types';
import { 
    IconBriefcase, 
    IconTools, 
    IconCode, 
    IconStack2, 
    IconAlertTriangle,
    IconChevronDown
} from '@tabler/icons-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ScrollArea } from './ui/ScrollArea';
import { cn } from '../lib/utils';

interface InfoPanelProps {
  level: LevelData | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ level }) => {
  if (!level) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-dashed rounded-xl text-slate-400 dark:text-slate-500 text-center">
        <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                <IconStack2 size={24} className="opacity-50 text-slate-900 dark:text-slate-100" />
            </div>
            <p className="text-sm font-medium">Select a level to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-50 shadow-sm h-full flex flex-col overflow-hidden transition-colors duration-300">
        {/* Card Header */}
        <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex-shrink-0">
            <div className="flex items-center gap-2 mb-1">
                <span 
                    className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    style={{ 
                        backgroundColor: `${level.color}15`, 
                        color: level.color, 
                        borderColor: `${level.color}30` 
                    }}
                >
                    Level {level.id}
                </span>
            </div>
            <h3 className="font-semibold leading-none tracking-tight text-xl text-slate-900 dark:text-slate-50">
                {level.title.split('—')[1].trim()}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {level.taskProfile[0]}
            </p>
        </div>
        
        {/* Card Content with Custom ScrollArea */}
        <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
                
                {/* Task Profile */}
                <CollapsibleSection 
                    title="Task Profile" 
                    icon={<IconBriefcase className="h-4 w-4" />}
                    defaultOpen={true}
                >
                    <ul className="space-y-1.5 pl-1">
                        {level.taskProfile.map((item, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

                {/* Real-world Examples */}
                <CollapsibleSection
                    title="Real-world Examples"
                    icon={<IconStack2 className="h-4 w-4" />}
                    defaultOpen={true}
                >
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-3">
                        <ul className="grid gap-2">
                            {level.examples.map((ex, i) => (
                                <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
                                    {ex}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CollapsibleSection>

                {/* AI Tools */}
                <CollapsibleSection 
                    title="AI Tools" 
                    icon={<IconTools className="h-4 w-4" />}
                    defaultOpen={false}
                >
                     <ul className="space-y-1.5 pl-1">
                        {level.aiTools.map((item, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

                {/* Engineering Involvement */}
                <CollapsibleSection
                    title="Engineering Involvement"
                    icon={<IconCode className="h-4 w-4" />}
                    defaultOpen={false}
                >
                    <div 
                        className="rounded-md border p-3 text-sm transition-colors"
                        style={{ 
                            borderColor: `${level.color}40`,
                            backgroundColor: `${level.color}08`
                        }}
                    >
                         <ul className="space-y-1.5">
                            {level.engineeringInvolvement.map((item, i) => (
                                <li key={i} className="text-slate-700 dark:text-slate-300 font-medium flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-500 dark:bg-slate-400 shrink-0 opacity-50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CollapsibleSection>

                 {/* Key Characteristics */}
                 <CollapsibleSection 
                    title="Key Characteristics" 
                    icon={<IconAlertTriangle className="h-4 w-4" />}
                    defaultOpen={false}
                >
                     <ul className="space-y-1.5 pl-1">
                        {level.keyCharacteristics.map((item, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

            </div>
        </ScrollArea>
    </div>
  );
};

interface CollapsibleSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <Collapsible.Trigger className="flex w-full items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" })}
                    </div>
                    <span className="text-sm font-semibold">{title}</span>
                </div>
                <IconChevronDown className="h-4 w-4 text-slate-500 transition-transform duration-200" />
            </Collapsible.Trigger>
            <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                <div className="px-4 pb-4 pt-0">
                    {children}
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export default InfoPanel;