export default function getTotalPages(total, limit) {
    return Math.ceil(total / limit);
}