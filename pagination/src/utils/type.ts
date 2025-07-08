export type BasePagination = {
    page?: number;
    take?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
};


export type MovieQueryType = BasePagination & {
    fromDate?: string;
    toDate?: string;
    nation?: string;
    director?: string;
    is_deleted?: boolean;
    actor_id?: number;
    gerne_id?: number;
    version_id?: number;
}

type Metadata = {
    total: number;
    page: number;
    totalPages: number;
    [key: string]: any;
}
export type PaginatedResponse<T> = {
    data: T[];
    meta: Metadata;
};
export type ActorResponse = {
    id: number;
    name: string;
    stage_name: string;
    gender: string;
    date_of_birth: string;
    nationality: string;
    biography: string;
    profile_image: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
};
export type Actor = {
    id: number;
    name: string;
};

export type Genre = {
    id: number;
    genre_name: string;
};

export type Version = {
    id: number;
    name: string;
};

export type ScheduleResponse = {
    id: number;
    is_deleted: boolean;
    cinema_room_id: number;
    start_movie_time: string;
    end_movie_time: string;
    version: Version;
    movie: Movie;
}
export type Movie = {
    id: number;
    name: string;
}

export type MovieResponse = {
    id: number;
    name: string;
    content: string;
    director: string;
    duration: number;
    from_date: string;
    to_date: string;
    limited_age: string;
    trailer: string;
    nation: string;
    production_company: string;
    thumbnail: string;
    banner: string;
    is_deleted: boolean;
    actors: Actor[];
    gernes: Genre[];
    versions: Version[];
};


export type TicketQueryType = BasePagination & {
    is_used?: boolean;
    active?: boolean;
    startDate?: string;
    endDate?: string;
};
export type MovieTicket = Movie & {
    duration: number;
    thumbnail: string;
}
export type CinemaRoom = {
    id: number;
    name: string;
};
export type SeatInfo = {
    id: string;
    row: string;
    column: string;
};
export type SeatType = {
    id: number;
    name: string;
};
export type TicketType = {
    id: number;
    name: string;
    audience_type: string;
};
export type TicketResponse = {
    id: string;
    is_used: boolean;
    status: boolean;
    ticketType: TicketType;
    schedule: {
        start_movie_time: string;
        end_movie_time: string;
        movie: MovieTicket;
        version: Version;
        cinemaRoom: CinemaRoom;
    };
    seat: SeatInfo;
    seat_type: SeatType;
};

export type ScheduleQueryType = BasePagination & {
    movieName?: string;
    cinemaRoomName?: string;
    scheduleStartTime?: string;
    scheduleEndTime?: string;
    version_id?: number;
    is_deleted?: boolean;
};

export type ActorQueryType = BasePagination & {
    name?: string;
    stage_name?: string;
    nationality?: string;
    date_of_birth?: string;
    gender?: string;
}

export type OrderQueryType = BasePagination & {
    startDate?: string;
    endDate?: string;
    status?: string;
    email?: string;
    paymentMethod?: string;
}

export type OverviewTicket = {
    totalTickets: number;
    totalAvailable: number;
    totalUsed: number;
}


export type OrderDetailType = {
    id: number;
    total_each_ticket: string;
    ticketId: string;
    seat: {
        id: string;
        seat_row: string;
        seat_column: string;
    };
    ticketType: {
        ticket_name: string;
    };
};
export type OrderExtraType = {
    id: number;
    quantity: number;
    unit_price: string;
    status: string;
    product: {
        id: number;
        name: string;
        type: string;
        price: string;
    };
};
export type TransactionType = {
    transaction_code: string;
    transaction_date: string;
    status: string;
    PaymentMethod: {
        method_name: string;
    };
};


export type OrderResponse = {
    id: number;
    order_date: string;
    total_prices: string;
    status: string;
    qr_code: string | null;
    user: {
        id: string;
        username: string;
        email: string;
    };
    promotion: {
        title: string;
    } | null;
    cinemaroom: {
        id: number;
        name: string;
    };
    schedule: {
        id: number;
        start_time: string;
        end_time: string;
    };
    movie: {
        id: number;
        name: string;
    };
    orderDetails: OrderDetailType[];
    orderExtras: OrderExtraType[];
    transaction: TransactionType;
};

export type OverviewOrder = {
    totalOrders: number;
    totalSuccess: number;
    totalFailed: number;
    totalPending: number;
    revenue: string;
};

export type Order = {
    id: number;
    order_date: string;
    total_prices: string;
    status: string;
    qr_code?: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
    promotion: {
        title: string;
    };
    cinemaroom: {
        id: number;
        name: string;
    };
    
    orderDetails: Array<{
        id: number;
        total_each_ticket: string;
        ticketId: string;
        seat: {
            id: string;
            seat_row: string;
            seat_column: string;
        };
        ticketType: {
            ticket_name: string;
        };
    }>;
    orderExtras: Array<{
        id: number;
        quantity: number;
        unit_price: string;
        status: string;
        product: {
            id: number;
            name: string;
            type: string;
            price: string;
        };
    }>;
    transaction: {
        transaction_code: string;
        transaction_date: string;
        status: string;
        PaymentMethod: {
            method_name: string;
        };
    };
};


