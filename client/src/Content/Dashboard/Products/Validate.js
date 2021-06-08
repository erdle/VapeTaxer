import React, { useState, useEffect, useCallback } from "react"
import {
    useParams
} from "react-router-dom";
import { syncAndGet, approve } from '../../../services/products'
import { Badge, Thumbnail, FormLayout, TextField, PageActions, Page, Popover, ActionList, Button, Stack, Card, TextContainer, List, ResourceList } from '@shopify/polaris';
import ToggleSwitch from "../../Helpers/ToggleSwitch"
import { ImageMajor } from '@shopify/polaris-icons';
import VariantValidationItem from "./VariantValidationItem"
import { useHistory } from "react-router-dom";

export default function Validate() {

    const [product, setProduct] = useState()
    const [pageination_data, setPagination_data] = useState({})
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        syncAndGet(id).then(res => {
            const { next_id, previous_id, data } = res;
            setProduct(res.data)
            setPagination_data({ next_id, previous_id })
        })
    }, [id])
    //TODO a better approach
    const handleFieldChange = (variant_id, field, value) => {
        const variants = product.variants.map(variant => {
            if (variant._id === variant_id) {
                variant[field] = value
            }
            return variant;
        })
        setProduct({ ...product, variants })
    }
    const handleApprove = useCallback(() => {
        const { next_id } = pageination_data;
        approve(product._id, product).then(res=>{
            history.push(`/dashboard/Products/Validate/${next_id}`);
        })        
    }, [pageination_data])
    
    
    const goNext = useCallback(() => {
        const { next_id } = pageination_data;
        history.push(`/dashboard/Products/Validate/${next_id}`);
    }, [pageination_data])

    const goPrevious = useCallback(() => {
        const { previous_id } = pageination_data;
        history.push(`/dashboard/Products/Validate/${previous_id}`);
    }, [pageination_data])
    const title = product ? <>{`${product.title} `}{product.approved ? <Badge status="success">Approved</Badge> : <Badge status="attention">Pending</Badge>}</> : ''
    const { previous_id, next_id } = pageination_data
    
    return <Page
        title={title}
        pagination={{
            hasPrevious: !!previous_id,
            hasNext: !!next_id,
            onNext: goNext,
            onPrevious: goPrevious,
        }}
    >
        <>
            <Card title={`Variants`} primaryFooterAction={{ content: 'All good', onAction: handleApprove }}>
                {
                    product && product.variants && product.variants.map(variantDetails =>
                        <VariantValidationItem key={variantDetails._id} variantData={variantDetails} onFieldChange={handleFieldChange} />
                    )
                }
                <Card.Section title="Note">
                    <TextContainer>
                        Taxes will be calculated based on these numbers. Please be sure that everything is correct!
                    </TextContainer>
                </Card.Section>
            </Card>
        </>

    </Page>



}