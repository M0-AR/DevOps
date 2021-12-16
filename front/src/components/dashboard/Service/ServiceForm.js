import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Controls  from './controls/Controls';
import { useForm, Form } from './useForm'

// Serivce Object
const initialValues = {
    service_id: '',
    service_title: '',
    service_price: '',
    service_image_url: '',
    service_is_available: true,
    service_start_date: new Date()
}

// Component
export default function ServiceForm(props) {

    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('service_title' in fieldValues)
            temp.service_title = fieldValues.service_title ? "" : "This field is required."
        if ('service_price' in fieldValues) 
            temp.service_price = fieldValues.service_price.length > 1 ? "" : "Minimum 2 number required."        
        if ('service_image_url' in fieldValues)
            temp.service_image_url = fieldValues.service_image_url ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors, 
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Title"
                        name="service_title"
                        value={values.service_title}
                        onChange={handleInputChange}
                        error={errors.service_title}
                    />
                    <Controls.Input
                        label="Price"
                        name="service_price"
                        value={values.service_price}
                        onChange={handleInputChange}
                        error={errors.service_price}
                    />
                    <Controls.Input
                        label="Image URL"
                        name="service_image_url"
                        value={values.service_image_url}
                        onChange={handleInputChange}
                        error={errors.service_image_url}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.DatePicker
                        label="Service Start Date"
                        name="service_start_date"
                        value={values.service_start_date}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        label="Available Service"
                        name="service_is_available"
                        value={values.service_is_available}
                        onChange={handleInputChange}
                    />

                    <div className='p-2'>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                        />
                    </div>
                </Grid>
            </Grid> 
        </Form>
    )
}

