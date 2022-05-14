export default function calculateOrderPrice(obj) {
    return Object.values(obj).reduce((acc, i) => {
        return acc += i.price * i.number;
    }, 0);
}