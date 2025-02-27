'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Delete, PlusCircle, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dialog } from '@mui/material';
import { CustomForm } from "../../components/forms/common-form/my-form";
import { fields } from "../lib/template-uload-form-controls";
import { pageSchema } from "../lib/templateValidation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { imageViewer } from "../lib/imageViewer";
import { useRouter } from "next/navigation";
import { AddPhotoAlternateRounded } from "@mui/icons-material";

const createPage = () => {

}
const Templates = () => {
    const [name, setName] = useState("");
    const [showPopup, setShowPopup] = useState(false)
    const [templates, setTemplates] = useState([])
    const [pages, setPages] = useState([])
    // const currentPageId = useSelector((state)=>state.currentPageId)
    const [file, setFile] = useState()
    const { toast } = useToast()
    const router = useRouter()
    //   const { pageStore } = useSelector((state) => state);
    //   const { pages } = pageStore;

    const fetchTemplates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/templates/get-all')
            console.log(response)
            if (response.data.status === 'success') {

                setTemplates(response.data?.templates)
            }

        } catch (error) {
            console.log('template creation error', error)
            toast.error('something go wrong')
        }
    }
    useEffect(() => {
        fetchTemplates()
    }, [])
    const closeModal = () => {
        setShowPopup(!showPopup)
    }
    const handleSubmit = async (data) => {
        console.log(data)
        toast({
            title: "Unauthorized",
            description: <code> {JSON.stringify(data)}</code>,
            variant: "destructive",
        });
        // setShowPopup(false)
        const formData = new FormData()
        formData.append('status', data.status)
        formData.append('templateName', data.templateName)
        formData.append('templatePrice', data.templatePrice)
        formData.append('PreviewImage', data.PreviewImage)
        formData.append('description', data.description)
        try {
            const response = await axios.post('http://localhost:8000/api/templates/register', formData)
            console.log(response)
            if (response.data.status !== 'success') {
                toast({
                    title: 'Error',
                    description: response?.error?.message
                })
            }
            setShowPopup(false)
            toast({
                title: 'Success',
                description: response?.data?.message
            })
            router.refresh()
            window.location.reload()

        } catch (error) {
            console.log('template creation error', error)
            toast.error('something go wrong')
        }

    };

    return (
        <div>
            <Dialog open={showPopup} onClose={closeModal} aria-labelledby="create-page-dialog" fullWidth maxWidth='xs' className="bg-transparent">
                <CustomForm
                    title='Create Template'
                    description={' Please fill all the fields Carefully.'}
                    fields={fields}
                    onSubmit={handleSubmit}
                    schema={pageSchema}
                    file={file}
                    setFile={setFile}

                />
            </Dialog>
            <Card>
                <CardHeader>
                    <CardTitle >
                        Manage Template
                    </CardTitle>
                    <div className="flex justify-end">
                        <Button onClick={() => setShowPopup(!showPopup)}>
                            <PlusCircle />
                            Add Template
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap justify-center">
                        {templates.map((template, index) => (

                            <Card key={index} className="m-4 w-80 bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <CardContent className="w-full h-48">
                                    <img src={imageViewer(template.PreviewImage) || './pro.jpg'} alt={template.title || 'Template Image'} className="min-w-full h-48 object-cover" />
                                </CardContent>
                                <CardFooter className="p-4 flex flex-col">
                                    <h1 className="text-xl font-semibold text-gray-800">{template.title || 'Template Title'}</h1>
                                    <p className="text-gray-400 text-sm mb-4">{template.description || 'Short description of the template'}</p>
                                    <div className="w-full flex justify-between mt-2">
                                        <Button onClick={() => router.push(`/admin-editor/${template.id}`)} className='bg-yellow-500'> <View /></Button>
                                        <Button variant='destructive'> <Delete /></Button>
                                        <Button className='bg-green-700'> <AddPhotoAlternateRounded /></Button>

                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Templates;
