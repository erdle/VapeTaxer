import React, { useState } from "react";
import { Button, Card, Form, FormLayout, Page, Heading } from "@shopify/polaris";
import { PolarisFormBuilder } from "@additionapps/polaris-form-builder";
import { CustomField } from "./CustomFields";
import { fields, respFields } from "./fields";

const Settings = () => {
    const [model, setModel] = useState({
        full_name: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        territory: null,
        emp_number: null,
        mailing_address: null,
        mailing_city: null,
        mailing_state: null,
        mailing_zip: null,
        mailing_territory: null,
        email: null,
    });
    const [respModel, setRespModel] = useState({
        name: null,
        title: null,
        phone: null,
    });

    const onSubmit = () => {
        console.log("Submitting...", model);
        console.log("Submitting...resp", respModel);
    };

    return (
        <Page narrowWidth>
            <Card title="Settings">
                <Card.Section>
                    <Form onSubmit={onSubmit}>
                        <FormLayout>
                            <PolarisFormBuilder
                                model={model}
                                fields={fields}
                                onModelUpdate={setModel}
                                customFields={[CustomField]}
                            />
                            <Heading>Responsible</Heading>
                            <PolarisFormBuilder
                                model={model}
                                fields={respFields}
                                onModelUpdate={setRespModel}
                            />
                            <Button submit primary>
                                Submit
                            </Button>
                        </FormLayout>
                    </Form>
                </Card.Section>
            </Card>
        </Page>
    );
};

export default Settings;
