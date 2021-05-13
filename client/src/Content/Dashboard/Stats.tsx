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
                    <Card title="Some cool stuff coming soon">
                        <Card.Section>
                            {
                                loading ? "Generating report..." :
                                    <div>
                                        <DisplayText size="large">Press button for generating CA report</DisplayText>
                                        <ButtonGroup>
                                            <Button primary onClick={generateAprilReport}>April report</Button>
                                            <Button primary onClick={generateMarchReport}>March report</Button>
                                        </ButtonGroup>
                                        <div>
                                            {aprilLink && <div><a target="_blank" href={aprilLink} download="april_CA">Download april_CA.pdf</a></div>}
                                            {marchLink && <div><a target="_blank" href={marchLink} download="march_CA">Download march_CA.pdf</a></div>}
                                        </div>
                                    </div>
                            }
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