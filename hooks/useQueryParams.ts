import { DependencyList, useEffect } from 'react';

export type popStateEventFn = (this: Window, event: PopStateEvent) => any
export type hookConfig = { triggerOnMountComponent: boolean }

export function useQueryParams(handle: () => any, deps: DependencyList | undefined, hookConfig?: hookConfig) {
    
    useEffect(() => {

        if (hookConfig && hookConfig.triggerOnMountComponent) handle();

        window.addEventListener("popstate", handle);

        return () => window.removeEventListener("popstate", handle);

    }, deps ?? []);

}