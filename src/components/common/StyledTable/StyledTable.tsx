import { Table, Td, Th, Thead, Tr } from "./styled";

export interface Column<T> {
    key: keyof T;
    title: string;
    clickable?: boolean;
}

interface TableProps<T> {
    columns?: Column<T>[];
    data: T[];
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    fullWidth?: boolean;
    onCellClick?: (row: T, column: keyof T) => void;
}

export const StyledTable = <T extends { [key: string]: any }>({
    columns,
    data,
    striped,
    bordered,
    hoverable,
    fullWidth,
    onCellClick,
}: TableProps<T>) => {
    const generatedColumns =
        columns ??
        (data.length > 0
            ? Object.keys(data[0]).map((key) => ({ key: key as keyof T, title: key, clickable: false }))
            : []);

    return (
        <Table fullWidth={fullWidth} bordered={bordered}>
            <Thead>
                <tr>
                    {generatedColumns.map((col) => (
                        <Th key={col.key as string} bordered={bordered}>
                            {col.title}
                        </Th>
                    ))}
                </tr>
            </Thead>
            <tbody>
                {data.map((row, index) => (
                    <Tr key={index} striped={striped} hoverable={hoverable}>
                        {generatedColumns.map((col) => (
                            <Td
                                key={col.key as string}
                                bordered={bordered}
                                clickable={col.clickable}
                                onClick={() => col.clickable && onCellClick?.(row, col.key)}
                            >
                                {row[col.key] as React.ReactNode}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </tbody>
        </Table>
    );
};
