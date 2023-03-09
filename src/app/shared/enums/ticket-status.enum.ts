export enum TicketStatus {
    open = 1,
    closed = 2,
    kmh = 3,
}

export const ticketStatusDescriptions: Record<keyof typeof TicketStatus, string> = {
    open: 'Açık',
    closed: 'Kapalı',
    kmh: 'KMH ',
}
