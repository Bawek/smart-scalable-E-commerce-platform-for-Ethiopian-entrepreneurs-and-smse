import React, { useEffect, useState, useRef } from "react";
import Grapesjs from "grapesjs";

// import 'grapesjs/dist/css/grapes.min.css';
import dynamicConfig from "./WithGrapesjs";
import "../../../../styles/app.css";
import Drawer from "@mui/material/Drawer";
import { TuneOutlined } from "@mui/icons-material";
import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetshopCategoryQuery } from "@/lib/features/shop/publicShopSlice";
import {
  useGetWebBuilderQuery,
  // useCustomisedTemplateMutation,
  // useGetCustomizedTemplateQuery,
  // useUpdatecustomizedTemplateMutation,
} from "@/lib/features/webBuilder/webBuilder";
import {
  useCustomisedTemplateMutation,
  useGetCustomizedTemplateQuery,
  useUpdatecustomizedTemplateMutation,
} from "@/lib/features/shop/shop";
import {
  useCreateShopMutation,
} from "@/lib/features/shop/shop";
import { useGetshopMerchantQuery } from "@/lib/features/shop/publicShopSlice";
import { toast } from "react-hot-toast";
import CustomToaster from "@/app/[locale]/components/sitebuilder/Toaster/Toaster";
import { AlertDialogDemo } from "./AlertDialoge";
import { AddProduct } from "./ProductForm/FormDialogue";
import { useDispatch, useSelector } from "react-redux";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";

const WithGrapesjs = ({ data, page, templateId }) => {
  console.log(page);
  const [pageContent, setpageContent] = useState({});
  const [
    createShop,
    { error: createShopError },
  ] = useCreateShopMutation();
  const [merchantId, setMerchantId] = useState(null);
  const [customizedTemplateData, setCustomizedTemplateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalTemplate, setOriginalTemplate] = useState(null);
  const [error, setError] = useState(null);
  const status = useSelector((state) => state.status.status);
  const pageName = useSelector((state) => state.status.pageName);
  const shopName = localStorage.getItem("shopName");
  const [editor, setEditor] = useState({});
  console.log(pageName, status);
  const [uploadImage, setUploadedImage] = useState([]);
  const {
    data: shop,
    status: shopstatus,
  } = useGetshopMerchantQuery(merchantId);
  const [triggerRequest, setTriggerRequest] = useState(false);
  const {
    data: customizedTemplateDataHook,
    refetch,
    error: queryError,
  } = useGetCustomizedTemplateQuery(merchantId);
  const { data: template, isLoading: templateLoading } =
    useGetWebBuilderQuery(templateId);
  const {
    data: ShopCategoryData,
    error: ShopCategoryError,
    isLoading: ShopCategoryLoading,
  } = useGetshopCategoryQuery();
  useCheckUnauthorized(queryError);
  useCheckUnauthorized(createShopError);

  const handlePageChange = (e) => {
    const selectedPageName = e.target.value;
    const selectedPage = page.find((pa) => pa.name === selectedPageName);
    setpageContent(selectedPage);

    if (selectedPage && editor.getHtml() !== selectedPage.html) {
      editor.setComponents(selectedPage.html);
      editor.setStyle(selectedPage.css);
    }

    setsettingOpen({
      ...settingOpen,
      name: selectedPageName,
      pageId: selectedPage.id,
    });
  };

  const conf = {
    storageType: "server", // Or "server" if you're storing assets on the server
    storeOnChange: true,
    storeAfterUpload: true,
    credentials: "include",
    multiUpload: true,

    assets: [],
    uploadFile: function (e) {
      var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      var formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      fetch("http://localhost:8000/shop/upload/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Debugging: Log the raw response data
          if (Array.isArray(data)) {
            const images = data.map((item) => ({
              type: "image",
              src: item,
            }));
            setUploadedImage(images);
            console.log(images[0].src + "imagese"); // Debugging: Log the processed images data
            // if (editor && editor.AssetManager) {
            // 	editor.AssetManager.add(images); // Ensure editor and AssetManager are defined
            // } else {
            // 	console.error('AssetManager is not available');
            // }
          } else {
            console.error("Unexpected response format");
          }
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    },
  };

  useEffect(() => {
    if (editor && editor.AssetManager && uploadImage.length > 0) {
      // Map the stored image URLs to the format expected by AssetManager

      // Add the images to the AssetManager
      editor.AssetManager.add(uploadImage);

      // Optionally, clear the uploadImage state if you don't need it anymore
      setUploadedImage([]);
    }
  }, [editor, uploadImage]); // Depend on both editor and uploadImage states

  const initialHtmlState = {
    html: "",
    css: "",
    assets: [],
    custom_body: `<script>console.log('body')</script>`,
    custom_footer: `<script>console.log('footer')</script>`,
    custom_head:
      '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">',
  };
  const router = useRouter();

  /** props */

  /** initial mount ref */
  const isInitialMount = useRef(true);

  const [initialComponents, setInitialComponents] = useState(initialHtmlState);
  const [builder, setBuilder] = useState({
    panelRight: false,
  });
  const [settingOpen, setsettingOpen] = useState({
    name: "",
    domain: "",
    pageId: null,
    open: false,
  });

  useEffect(() => {
    if (page) {
      // Filter the data to include only the page with the name "home"
      const homePage = page.find((pa) => pa.name === "Home");
      // If a home page is found, set it as the initial pageContent
      if (homePage) {
        setpageContent(homePage);
      } else {
        // If no home page is found, you can set the first page as the initial pageContent
        // or handle this case as needed
        setpageContent(page[0]);
      }
    }
    if (data) {
      const homePage = data.find((page) => page.name === "Home");
      const pageToRender = homePage;

      setInitialComponents({
        html: pageToRender?.content.html,
        css: pageToRender?.content.css,
        custom_head: pageToRender?.custom_head || "",
        custom_footer: pageToRender?.custom_footer || "",
      });
      setsettingOpen({
        name: pageToRender?.name,
        domain: pageToRender?.customdomain || "",
        open: false,
      });
    }
  }, [data, page]);

  /** Grapes js Initialization */
  const loadGrapesJs = async () => {
    const editor = await Grapesjs.init({
      ...dynamicConfig(customizedTemplateDataHook?.id),
      assetManager: conf,
    });

    // const assetManager = editor.AssetManager.conf;
    setEditor(editor);
    addCommands(editor);
    addDevices(editor);
    isStylesOpen(editor);
    imageUploader(editor);
    addStyleManager(editor);
    addPage(editor);
    onLoad(editor);
    const canvas = editor.Canvas;
    // assetManager.add(assets);
    // setTimeout(addStyleManager(editor),0);
    const selected = editor.getSelected();
    // console.log(editor.getSelected);
    // Scroll smoothly (this behavior can be polyfilled)
    // canvas.scrollTo(selected, { alignToTop : false });
    canvas.scrollTo(selected, { behavior: "smooth" });
    // Force the scroll, even if the element is alredy visible
    canvas.scrollTo(selected, { force: true });
    // editor.StyleManager.getProperty('typography', 'Rubik');
  };

  /** handle open style container */
  const handleopen = () => {
    setBuilder({ ...builder, panelRight: true });
  };

  /** handle close style container */
  const handleClose = () => {
    const ele = window?.editor?.getSelected();
    window.editor?.selectToggle(ele);
    setBuilder({ ...builder, panelRight: false });
  };

  /** after loaading of grapejs  */
  const onLoad = (editor) => {
    const categories = editor.BlockManager.getCategories();

    // Assuming `data` is the prop that contains the updated content
    const homePage = data.find((page) => page.name === "home");
    const pageToRender = homePage || data[0]; // If home page not found, render the first page

    // Set initial HTML in builder using the updated data
    editor.setComponents(pageToRender?.content.html);

    // Setting CSS
    editor.setStyle(pageToRender?.content.css);

    /** Find block categories and make default open false */
    categories.forEach((category) => {
      category.set("open", false).on("change:open", (opened) => {
        opened.get("open") &&
          categories.each((category) => {
            category !== opened && category.set("open", false);
          });
      });
    });
  };

  /** Load custom data */
  // const loadCustomData = () => {
  //   const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  //   codeViewer.set({
  //     ...{ codeName: 'htmlmixed', theme: 'hopscotch', readOnly: 0 },
  //   });
  //   editor.on('load', onLoad);
  // };

  /** add commands */
  const addCommands = (editor) => {
    const commands = editor.Commands;
    commands.getAll();
    commands.add("set-device-xs", {
      run(editor) {
        editor.setDevice("Mobile");
      },
    });
    commands.add("set-device-sm", {
      run(editor) {
        editor.setDevice("Tablet");
      },
    });
    commands.add("set-device-md", {
      run(editor) {
        editor.setDevice("Medium");
      },
    });
    commands.add("set-device-lg", {
      run(editor) {
        editor.setDevice("Large");
      },
    });
    commands.add("set-device-xl", {
      run(editor) {
        editor.setDevice("Desktop");
      },
    });
    commands.add("open-assset-manager", {
      run(editor) {
        // console.log(EventTarget);
        const myCommands = commands.get("core:open-assets");
        myCommands.run(editor, { target: "_blank" });
      },
    });
  };

  const addPage = () => { };

  // add devices
  const addDevices = (editor) => {
    const deviceManager = editor.DeviceManager;
    deviceManager.add("Mobile", "385px", {
      width: "385px", //width for mobile size
      name: "Mobile", // device name
      widthMedia: "576px", // the width that will be used for the CSS media
    });
  };

  /** component and canvas action events */
  const isStylesOpen = (editor) => {
    editor.on("component:selected", handleopen);
    editor.on("component:deselected", handleClose);
    editor.on("run:preview:before", function () { });
  };

  // add dynamic styles
  const addStyleManager = (editor) => {
    const styleManager = editor.StyleManager;
    // let list = fontProperty.get('list');
    // list.push({ value: 'Manrope, sans-serif', name: 'Manrope' });
    // list.push({ value: 'Nunito, sans-serif', name: 'Nunito' });
    // list.push({ value: 'Segoe UI', name: 'Segoe UI' });
  };

  // image upload
  // Inside your WithGrapesjs component

  // Refine the imageUploader function
  const imageUploader = (editor) => {
    // editor.AssetManager.storageType = "server";
    // editor.AssetManager.storeOnChange = true;
    // editor.AssetManager.storeAfterUpload = true;
    // editor.AssetManager.upload = 'http://localhost:8000/shop/upload/';
    // editor.AssetManager.assets = [];

    // editor.AssetManager.uploadFile = function (e) {
    //   var files = e.dataTransfer? e.dataTransfer.files : e.target.files;
    //   var formData = new FormData();

    //   Array.from(files).forEach(file => {
    // 	formData.append("files[]", file);
    //   });

    //   return fetch(editor.AssetManager.upload, {
    // 	method: "POST",
    // 	body: formData,
    //   })
    //  .then(response => response.json())
    //  .then(data => {
    // 	if (Array.isArray(data.urls)) {
    // 	  const images = data.urls.map(item => ({
    // 		type: "image",
    // 		src: item.url,
    // 	  }));
    // 	  return images;
    // 	} else {
    // 	  throw new Error('Unexpected response format');
    // 	}
    //   })
    //  .catch(error => {
    // 	console.error("Error uploading files:", error);
    // 	throw error; // Rethrow the error for GrapesJS to handle
    //   });
    // };

    editor.on("asset:upload:start", () => {
      console.log("Start uploading...");
    });

    editor.on("asset:upload:error", (err) => {
      console.error("Error during upload:", err);
    });

    editor.on("asset:upload:response", (response) => {
      console.log("Response from server:", response);
      if (Array.isArray(response)) {
        const images = response.map((item) => ({
          type: "image",
          src: item.url,
        }));
        editor.AssetManager.add(images);
      } else {
        console.error("Expected an array, got:", typeof response);
      }
    });

    editor.on("asset:upload:end", () => {
      console.log("Upload ended.");
    });
  };

  //  Life cycle method for loading grapesjs */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadGrapesJs();
    }
    //else {
    //   loadCustomData();
    // }
  }, [editor]);

  const toggleDrawer = () => {
    setsettingOpen({
      ...settingOpen,
      open: !settingOpen.open,
    });
  };

  const handleUpdatePage = (e) => {
    e.preventDefault();
    props.updatePage({
      page_id: data._id,
      body: {
        name: settingOpen.name,
        customdomain: settingOpen.domain,
      },
    });
    toggleDrawer();
  };



  const [customisedTemplate] =
    useCustomisedTemplateMutation();

  const [
    updateCustomisedTemplate,
    { error: updateerror },
  ] = useUpdatecustomizedTemplateMutation();
  useCheckUnauthorized(updateerror);
  useEffect(() => {
    const storedmerchantId = localStorage.getItem("unique_id");
    setMerchantId(storedmerchantId);
  }, []);

  useEffect(() => {
    if (triggerRequest) {
      updatePageHandler()
        .then(() => {
          setTriggerRequest(false); // Reset trigger after handling request
        })
        .catch((err) => {
          console.error("Error updating template:", err);
          toast.error("Saving failed");
          setTriggerRequest(false); // Reset trigger on error
        });
    }
  }, [triggerRequest]);

  const updatePageHandler = async (isPublish = false) => {
    toast.dismiss();
    try {
      const modifiedPagesData = {};

      // Iterate over each page
      for (let i = 0; i < page.length; i++) {
        const pa = page[i];
        const pageName = pa.name;

        // Initialize pageContent and pageCss variables
        let pageContent, pageCss;

        // If the current page matches the selected page, get the HTML and CSS from the editor
        if (pageName === settingOpen.name) {
          pageContent = editor.getHtml();
          pageCss = editor.getCss();
        } else {
          // Otherwise, keep the original content from the pa object
          pageContent = pa.html;
          pageCss = pa.css;
        }

        // Compare the content with the original page data
        const pageJs = pa.js; // Assuming you have a way to get the JS for each page

        // If there are differences, include the modified content
        modifiedPagesData[pageName] = {
          html: pageContent,
          css: pageCss,
          js: pageJs,
        };
      }

      // Use the state variables instead of directly calling the hook
      if (queryError && queryError.status === 404) {
        console.log(
          "Customized template does not exist for the given merchant ID"
        );
        await customisedTemplate({
          originalTemplateId: templateId,
          modifiedMerhant: merchantId,
          modifiedPages: modifiedPagesData,
        }).unwrap();
        refetch();
      } else if (customizedTemplateDataHook) {
        console.log("Exists");
        const customizedTemplateId = customizedTemplateDataHook.id;

        // Update the existing customized template
        // sending the  modifiedPagesData

        await updateCustomisedTemplate({
          customised_templateId: customizedTemplateId,
          modifiedPages: modifiedPagesData,
        }).unwrap();
      }

      if (isPublish) {
        // This should be dynamically set based on your form or state
        localStorage.setItem("status", "publish");
        await createShop({
          name: shopName,
          templateId: customizedTemplateDataHook.id,
        }).unwrap();
        toast.success("Shop published successfully");
        setTimeout(() => {
          router.push(
            `/preview/${customizedTemplateDataHook?.id}/${pageContent.name}`
          );
        }, 1000);
        // localStorage.removeItem("status")
      } else {
        if (customisedTemplate || updateCustomisedTemplate) {
          toast.success("Saved successfully");
        } else {
          console.log("error in create or update customised data");
        }
      }
    } catch (error) {
      console.error("Error updating template:", error);
      setTimeout(() => {
        toast.error("Saving failed");
      }, 1000);
    }
  };
  useEffect(() => {
    console.log("Shop status:", shopstatus); // Should log 200 if successful
    console.log("Shop data:", shop); // Should log the shop data
  }, [shopstatus, shop]);

  const publishHandlerNoSave = () => {
    // router.push("/admin/dashboard");
  };
  return (
    <div>
      <Drawer
        anchor={"right"}
        open={settingOpen.open}
        onClose={toggleDrawer}
        PaperProps={{ className: "z-30" }}
      >
        <div style={{ padding: "1rem" }} className="">
          <form onSubmit={handleUpdatePage}>
            <div id="Page-name" className="field-wrapper input">
              <label htmlFor="page-name">Page Name</label>

              <select
                id="name"
                name="page-name"
                className="form-control"
                value={settingOpen.name}
                onChange={handlePageChange}
              >
                {data.map((page, index) => (
                  <option key={index} value={page.name}>
                    {page.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              id="Domain-name"
              className="field-wrapper input"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >
              <label htmlFor="domain-name">Domain Name</label>
              <input
                id="domain"
                name="domain-name"
                type="text"
                className="form-control"
                placeholder="Type your domain name"
                value={settingOpen.domain}
                onChange={(e) => {
                  setsettingOpen({
                    ...settingOpen,
                    domain: e.target.value,
                  });
                }}
              />
            </div>
            <button
              onClick={() => handleUpdatePage()}
              className="btn btn-primary rounded-lg"
            >
              Save
            </button>
          </form>
          <div>
            <AddProduct />
          </div>
        </div>
      </Drawer>
      <div className="panel__top flex flex-wrap">
        {/* <div>
        </div> */}
        <div className="panel__switcher">
          <KeyboardBackspaceOutlined
            onClick={() => router.back()}
            className="go_back"
          />
        </div>

        <div className="views-actions" style={{ position: "static" }}></div>

        <div className="panel-action ">
          <button
            className="py-1 px-3 btn-primary rounded-lg"
            onClick={() => setTriggerRequest(true)}
          >
            Save
          </button>
          <CustomToaster />
          {/* <Link href=""> */}
          {/* <button
            onClick={() => publishHandler()}
            className="btn btn-primary"
            style={{ marginLeft: "1rem" }}
          >
            Publish
          </button> */}
          {shopstatus !== "fulfilled" && (
            <AlertDialogDemo
              button="Publish"
              publishSaveClick={() => updatePageHandler(true)}
              publishCancelClick={publishHandlerNoSave}
            />
          )}

          {/* </Link> */}
          {pageContent?.id && (
            <Link
              href={`/preview/${customizedTemplateDataHook?.id}/${pageContent.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="py-1 px-3 btn-primary rounded-lg"
                style={{ marginLeft: "1rem" }}
              >
                Preview
              </button>
            </Link>
          )}
          <TuneOutlined
            style={{ marginLeft: "1rem", cursor: "pointer" }}
            fontSize="medium"
            onClick={toggleDrawer}
          />
        </div>
      </div>
      <div className="editor-row ml-4">
        <div id="blocks" />
        <div className="editor-canvas">
          <div id="gjs">
            {/* {template?.html}
            <h1>Hello world</h1> */}
          </div>
        </div>
        <div
          className="panel__right"
          style={
            builder.panelRight ? { display: "block" } : { display: "none" }
          }
        >
          <div className="close-icon">
            <i
              className="crossCircle"
              style={{ cursor: "pointer", color: "black" }}
              onClick={handleClose}
            ></i>
          </div>
          <div id="traits-container" />
          <div className="layers-container" />
          <div className="styles-container" />
        </div>
      </div>
    </div>
  );
};

export default WithGrapesjs;
