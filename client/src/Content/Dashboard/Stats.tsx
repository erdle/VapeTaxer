import React, { useCallback, useState, useEffect } from 'react';
import {
    Select,
    Layout,
    FormLayout,
    TextField,
    Banner,
    Card,
    Stack,
    Button,
    Collapsible,
    TextContainer,
    Checkbox,
    Icon,
    Autocomplete,
    Scrollable,
    Tag,
    SelectOption,
    ContextualSaveBar,
    Link,
    ResourceList,
    DisplayText,
    Page
} from '@shopify/polaris';

import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart } from 'react-vis';

const Form: React.FC = () => {
    const myData = [{ angle: 30, label: "asdasd", color: "3" }, { angle: 5 }]
    return <div>
        <Page>
            <Layout>
                <Layout.Section oneThird>
                    <Card title="Product issues">

                        <Card.Section>
                            <DisplayText size="large">13</DisplayText>
                        </Card.Section>
                        <Card.Section title="Issues">
                            <ResourceList
                                resourceName={{ singular: 'sale', plural: 'sales' }}
                                items={[
                                    {
                                        sales: 'Image alt text not set',
                                        amount: '5',
                                        url: 'reports/orders',
                                    },
                                    {
                                        sales: 'Variants without image',
                                        amount: '2',
                                        url: 'reports/returns',
                                    },
                                    {
                                        sales: 'No tag',
                                        amount: '6',
                                        url: 'reports/returns',
                                    },
                                ]}
                                renderItem={(item) => {
                                    const { sales, amount, url } = item;
                                    return (
                                        <ResourceList.Item
                                            url={url}
                                            accessibilityLabel={`View Sales for ${sales}`}
                                            onClick={() => { }}
                                            id={url}
                                        >
                                            <Stack>
                                                <Stack.Item fill>{sales}</Stack.Item>
                                                <Stack.Item>{amount}</Stack.Item>
                                            </Stack>
                                        </ResourceList.Item>
                                    );
                                }}
                            />
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section oneThird>
                    <Card title="Collection issues" sectioned>

                    </Card>
                </Layout.Section>
            </Layout >
        </Page>
    </div >
}

export default Form