import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataTable, Link, Button, Icon, ButtonGroup, Stack, TextContainer } from '@shopify/polaris';
import { toArrayOfProps } from "../../../utils/dataTableHelper"
import {
    ChevronLeftMinor,
    ChevronRightMinor
} from '@shopify/polaris-icons';
export default function ProductsList({ producstGetter }) {
    const page_size = 10 //TODO config
    const [productRows, setProductRows] = useState([]);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const handleChangePage = (newPage = 0) => {
        if (newPage >= 0 && count / page_size >= newPage) {
            setPage(newPage);
            producstGetter && producstGetter(newPage).then(res => {
                const rows = toArrayOfProps(res.data, columns)
                setCount(res.count)
                setProductRows(rows);
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
        { name: "title", renderer: (product) => <Link removeUnderline url={`/dashboard/Listings/edit/${product['_id']}`}>{product["title"]}</Link> },
        { name: "vendor" },
        { name: "product_type" },
    ]

    useEffect(() => {
        handleChangePage()
    }, [producstGetter])

    const tableFooter = <Stack on alignment="center">
        <ButtonGroup segmented>
            <Button onClick={previousPage} disabled={page == 0} icon={ChevronLeftMinor} />
            <Button onClick={nextPage} disabled={((page + 1) * page_size >= count)} icon={ChevronRightMinor} />
        </ButtonGroup>
        <TextContainer>
            {`Showing ${page * page_size + 1} - ${page * page_size + productRows.length} of ${count} results`}
        </TextContainer>
    </Stack>

    return <>
        <DataTable
            columnContentTypes={[
                'text',
                'text',
                'text'
            ]}
            headings={[
                'Product',
                'Vendor',
                'Type',
            ]}
            rows={productRows}
            footerContent={tableFooter}
        />
    </>
}