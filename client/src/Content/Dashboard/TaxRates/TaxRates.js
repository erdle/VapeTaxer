import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataTable, Link, Button, Icon, ButtonGroup, Stack, TextContainer } from '@shopify/polaris';
import { toArrayOfProps } from "../../../utils/dataTableHelper"

import {
    ChevronLeftMinor,
    ChevronRightMinor
} from '@shopify/polaris-icons';
export default function TaxRatesList({ taxRateGetter }) {
    const page_size = 20 //TODO config
    const [taxRateRows, settaxRateRows] = useState([]);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const handleChangePage = (newPage = 0) => {
        if (newPage >= 0 && count / page_size >= newPage) {
            setPage(newPage);
            taxRateGetter && taxRateGetter(newPage, page_size).then(res => {
                const rows = toArrayOfProps(res.data, columns)
                setCount(res.count)
                settaxRateRows(rows);
            }).catch(err => { console.log(err) })
        }
    };

    const nextPage = useCallback(() => {
        handleChangePage(page + 1, count)
    }, [page, count])
    const previousPage = useCallback(() => {
        handleChangePage(page - 1, count)
    }, [page, count])

    const columns = [
        { name: "state", renderer: (tax_rate) => <div>{tax_rate.state.name}({tax_rate.state.shortcode})</div> },
        { name: "product", renderer: (tax_rate) => <div>{tax_rate.tax.name} #{tax_rate.tax.tag}</div> },
        { name: "taxType" },
        { name: "value" },
    ]
    useEffect(() => {
        handleChangePage()
    }, [taxRateGetter])

    const tableFooter = <Stack on alignment="center">
        <ButtonGroup segmented>
            <Button onClick={previousPage} disabled={page == 0} icon={ChevronLeftMinor} />
            <Button onClick={nextPage} disabled={((page + 1) * page_size >= count)} icon={ChevronRightMinor} />
        </ButtonGroup>
        <TextContainer>
            {`Showing ${page * page_size + 1} - ${page * page_size + taxRateRows.length} of ${count} results`}
        </TextContainer>
    </Stack>
    return <>
        <DataTable
            columnContentTypes={[
                'text',
                'text',
                'text',
                'text'
            ]}
            headings={[
                'State',
                'Product',
                'Calculation Type',
                'Rate'
            ]}
            rows={taxRateRows}
            footerContent={tableFooter}
        />
    </>
}