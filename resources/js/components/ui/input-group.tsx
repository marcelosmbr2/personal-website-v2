import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="input-group" className={cn('flex', className)} {...props} />;
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
    return <Input className={cn('rounded-r-none border-r-0 focus-visible:z-10', className)} {...props} />;
}

function InputGroupAddon({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="input-group-addon"
            className={cn(
                'border-input flex items-center rounded-r-md border border-l-0 bg-transparent px-3 text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

export { InputGroup, InputGroupInput, InputGroupAddon };
