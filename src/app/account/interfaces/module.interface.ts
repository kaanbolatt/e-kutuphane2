
export interface Module {
    id: number
    name?:string
    shortName: string,
    iconName: string,
    description: string,
    showInMenu?: boolean,
    order: number,
    containerId?: number,
    appCode?: number,
    }
    