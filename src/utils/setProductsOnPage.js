export default function setProductsOnPage(arr, productsToShow, totalPages) {
    const arrMap = {};
    let start = 0;
    let end = productsToShow;
    for (let i = 1; i <= totalPages; i++) {
        arrMap[i] = arr.slice(start, end);
        start += productsToShow;
        end += productsToShow;
    }
    return arrMap;
}