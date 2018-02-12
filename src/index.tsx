import * as React from 'react'

export interface BoxProps {
    className?: string, children?: any
}

const flex_box_generator = (default_class_name: string, style: object): React.StatelessComponent<BoxProps> => {
    return (props: BoxProps): JSX.Element => {
        return (
            <div style={style} className={default_class_name + ' ' + (props.className || '')}>
                {props.children}
            </div>    
        )
    }
}

export const HBox = flex_box_generator('dxb dxb-box dxb-hbox', {
    display: 'inline-flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
})

export const VBox = flex_box_generator('dxb dxb-box dxb-vbox', {
    display: 'inline-flex',
    flexFlow: 'column wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
})

export function SectionBox(props: { className?: string, title?: string, children?: any }): JSX.Element {
    return (
        <div className={'dxb dxb-section ' + (props.className || '')}>
            {
                props.title ? <h2 className='dxb dxb-section-title'>{props.title}</h2> : ''
            }    
            <div className='dxb dxb-section-content'>
                {props.children}    
            </div>
        </div>
    )
}

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