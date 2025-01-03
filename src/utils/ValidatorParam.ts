/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterValidParams = (params: any): Record<string, any> => {
    const filteredParams: Record<string, any> = {};

    for (const key in params) {
        const value = params[key];

        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            !(Array.isArray(value) && value.length === 0) &&
            !(value instanceof Set && value.size === 0) &&
            !(typeof value === "number" && value === 0 && key !== "page" && key !== "size") // Giữ lại `page` và `size` nếu bằng 0
        ) {
            // Chuyển `Set` thành mảng nếu cần, nếu Set rỗng, loại bỏ tham số
            if (value instanceof Set && value.size === 0) {
                continue; // Bỏ qua tham số này nếu Set rỗng
            }
            filteredParams[key] = value instanceof Set ? Array.from(value) : value;
        }
    }

    return filteredParams;
};

