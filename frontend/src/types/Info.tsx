export interface InfoProps {
    icon: React.ElementType;
    label: string;
    content?: React.ElementType;
    href?: string;
}

export interface ScheduleProps {
    days: {
        date: Date;
        description: string;
    }[];
}

export interface CoordinateProps {
    lat: number;
    lng: number;
}
