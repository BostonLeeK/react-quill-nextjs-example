export type BindingHandlerRange = {
    index: number;
    length: number;
}

export type BindingHandlerContext = {
    collapsed: boolean;
    empty: boolean;
    format: Record<string, any>;
    offset: number;
    prefix: string;
    suffix: string;
}