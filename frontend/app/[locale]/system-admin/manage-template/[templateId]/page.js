'use client'
import { CustomForm } from '@/app/[locale]/components/forms/common-form/my-form'
import { useParams } from 'next/navigation'
import React from 'react'
import { fields } from '../../lib/template-uload-form-controls'
import { pageSchema } from '../../lib/templateValidation'
import { useState } from 'react'

const EditTemplate = () => {
    const params = useParams()
    const [file, setFile] = useState()
    const handleSubmit = (data) => {
        console.log(data, 'submited')
    }
    const sampleData = {
        templateName: "Modern E-Commerce Template",
        templatePrice: 49.99,
        PreviewImage: "https://example.com/preview-image.jpg", // URL of the image
        description: "A sleek and modern e-commerce template with a responsive design.",
        status: "publish" // Assuming you meant "publish" instead of "puplish"
    };
    const templateId = params.templateId
    return (
        <div className='pb-5 flex flex-col items-center justify-center w-full'>
            <h1 className='text-2xl font-bold mb-4'>Edit Template</h1>
            <div>
                <CustomForm
                    fields={fields}
                    onSubmit={handleSubmit}
                    schema={pageSchema}
                    file={file}
                    setFile={setFile}
                    data={sampleData}

                />
            </div>
        </div>
    )
}

export default EditTemplate
