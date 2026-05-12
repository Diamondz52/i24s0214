import { formatDate } from "@/utils/formatters";

export function sayHello(name: string): string {
    return `прив, ${name}, Сегодняшняя дата ${formatDate(new Date())}`;
}