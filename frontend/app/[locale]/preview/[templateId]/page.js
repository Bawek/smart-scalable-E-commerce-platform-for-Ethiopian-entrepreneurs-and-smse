"use client";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation"; // Import useRouter from next/router
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTemplateByIdQuery } from "@/lib/features/templates/templateApi";
function PreviewPage() {
    const params = useParams()
    const status = useSelector((state) => state.status.status);
    const [currentTemplate, setCurrentTemplate] = useState({
        html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
        css: `h1{text-align:center;color:red;}`
    })
    const templateId = params.templateId;
    const { data, isLoading } = useGetTemplateByIdQuery(templateId);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true)
        if (hasMounted && !isLoading) { 
            console.log(data,'total data')
            setTimeout(() => {
                data?.template.pages.map((page) => {
                    if (page.name === "home") {
                        setCurrentTemplate(page)
                    }
                })
            }, 3000)
        }
    }, [data]);
    console.log(currentTemplate, 'current page')
    return (
        <>
            <style>{currentTemplate?.css}</style>
            {/* {finalContent ? ( */}
            <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
            {/* ) : (
         <div dangerouslySetInnerHTML={{ __html: data?.html }} />
         )}{" "} */}
            {/* <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} /> */}
        </>
    );
}

export default PreviewPage;
