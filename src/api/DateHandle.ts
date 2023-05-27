interface DateFormat {
    year: "numeric" | "2-digit",
    month: "numeric" | "2-digit" | "long" | "short" | "narrow"
    day: "numeric" | "2-digit",
}

export default class DateHandle {
    private date: Date;

    constructor(dateStr: string) {
        this.date = new Date(dateStr)
    }

    public format(format: DateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' }) {
        return (new Intl.DateTimeFormat('en', format).format(this.date));
    }
}