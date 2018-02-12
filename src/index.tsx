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

export interface TableProps<T> {
    records: T[],
    headers?: string[],
    className?: string,
}

export function RowTable<T>(props: TableProps<T>): JSX.Element {
    const records = props.records
    const headers = props.headers ? props.headers : Object.keys(records)
    const rows = records.map(r => <tr>{headers.map(h => <td>{(r as any)[h]}</td>)}</tr>)
    return (
        <table className={'dxb dxb-table dxb-row-table ' + (props.className || '')}>
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

export function ColTable<T>(props: TableProps<T>): JSX.Element {
    const records = props.records
    const headers = props.headers ? props.headers : Object.keys(records[0])
    const rows = []
    for (let i = 0; i < headers.length; i += 1) {
        rows.push([])
        const header = headers[i]
        Array.prototype.push
            .apply(rows[i], records.map(r => (r as any)[header]))
    }
    return (
        <table className={'dxb dxb-table dxb-col-table ' + (props.className || '')}>
            <tbody>
                {
                    rows.map((row, i) => <tr><th>{headers[i]}</th>{row.map(cell => <td>{cell}</td>)}</tr>)
                }
            </tbody>
        </table>
    )
}