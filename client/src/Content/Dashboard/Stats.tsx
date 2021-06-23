import React, { useCallback, useState, useEffect } from 'react';

import {
    ButtonGroup,
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
import TaxRatesList from "./TaxRates/Index"
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart } from 'react-vis';

const Form: React.FC = () => {
    const myData = [{ angle: 30, label: "asdasd", color: "3" }, { angle: 5 }]

    return <div>
        <Page>
            <Layout>
                <Layout.Section oneThird>
                    <Card title="Somess cool stuff coming soon">
                        <Card.Section>
                            
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section oneThird>
                </Layout.Section>
            </Layout >
        </Page>
    </div >
}


export default Form