import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInWeeks } from "date-fns";

export const formatTimeAgo = (createdAt: Date): string => {
    const now = new Date();

    const minutes = differenceInMinutes(now, createdAt);
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;

    const hours = differenceInHours(now, createdAt);
    if (hours < 24) return `${hours} giờ trước`;

    const days = differenceInDays(now, createdAt);
    if (days === 1) return '1 ngày trước';
    if (days < 7) return `${days} ngày trước`;

    const weeks = differenceInWeeks(now, createdAt);
    if (weeks === 1) return '1 tuần trước';
    if (weeks < 4) return `${weeks} tuần trước`;

    const months = differenceInMonths(now, createdAt);
    if (months === 1) return '1 tháng trước';
    return `${months} tháng trước`;
};
