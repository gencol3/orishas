'use client';

import clsx from 'clsx';

export function Form({ children, className, ...rest }: any) {

    return (
        <form {...rest} className={clsx('flex flex-col gap-4', className)}>
            {children}
        </form>
    );
}