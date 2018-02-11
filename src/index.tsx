import * as React from 'react'

export interface BoxProps {
    className?: string, title?: string, children?: any
}

const flex_box_generator = (default_class_name: string): React.StatelessComponent<BoxProps> => {
    return (props: BoxProps): JSX.Element => {
        return (
            <div className={default_class_name + ' ' + (props.className || '')}>
                <h2 className='dxb dxb-box-title'>{props.title}</h2>    
                <div className='dxb dxb-box-content'>
                    {props.children}    
                </div>
            </div>    
        )
    }
}

export const HBox = flex_box_generator('dxb dxb-box dxb-hbox')
export const VBox = flex_box_generator('dxb dxb-box dxb-vbox')

export interface SplitTable {
    headers: string[],
    cross_headers?: string[],
    values: string[][],
}

export type TableProps<T> = (SplitTable | {records: T[]}) & { className?: string }

function isSplitTable<T>(props: TableProps<T>): props is SplitTable {
    return (props as SplitTable).headers !== undefined && (props as SplitTable).values !== undefined
}

function split_table<T>(props: TableProps<T>): SplitTable {
    if (!isSplitTable(props)) {
        // TODO: Options for alphabetizing or sorting records? Maybe an ordered keys field...
        const headers = Object.keys(props.records[0])
        const values = props.records.map(r => headers.map(h => (r as any)[h]))
        return {
            headers,
            values,
        }
    } else {
        return props
    }
}

export function RowTable<T>(props: TableProps<T>): JSX.Element {
    const { headers, values, cross_headers } = split_table(props)
    const rows = cross_headers ? values.map((r, i) =>
            <tr><th>{cross_headers[i]}</th> {r.map(cell => <td>{cell}</td>)}</tr>)
        : values.map(r => <tr>{r.map(cell => <td>{cell}</td>)}</tr>)
    return (
        <table className={'dxb dxb-row-table ' + (props.className || '')}>
            <thead>
                <tr>
                    {headers.map(h => <th>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}