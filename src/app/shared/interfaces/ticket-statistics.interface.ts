import { GraphInfo } from "./graph-info.interface";

export interface TicketStatistics {
    totalTickets: number;
    openTickets: number;
    closedTickets: number;
    graphInfo: GraphInfo[]
}
