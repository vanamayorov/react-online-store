import Select from 'react-select';

const options = [
    { value: '', label: 'Сортировать...' },
    { value: 'asc', label: 'От дешевых к дорогим' },
    { value: 'desc', label: 'От дорогих к дешевым' },
];

const SelectProducts = ({ setSort }) => {
    return (
        <Select
            defaultValue={options[0]}
            options={options}
            onChange={e => setSort(e.value)}
            isSearchable={false}
        />
    )
}

export { SelectProducts };