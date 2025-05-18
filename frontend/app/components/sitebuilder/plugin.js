import "./BlockStyles/file.css";
export const plugin1 = (editor, opts = {}) => {
  const labels = {
    block1: true,
    block2: true,
    block3: true,
    block4: true,
    block5: true,
    block6: true,
    block7: true,
    block8: true,
    block9: true,
    block10: true,
    block11: true,
    block12: true,
    block13: true,
    block14: true,
    block15: true,
    block16: true,
    block17: true,
    block18: true
  };

  const categories = {
    category1: "Header",
    category2: "Main Banner",
    category3: "Contact Form",
    category4: "File Upload",
    category5: "Product Card",
    category6: "Gallery",
    category7: "Testimonials",
    category8: "Blogs",
    category9: "About Page",
    category10: "Footer",
    category11: "Dashboard"
  };

  opts = { labels: labels, categories: categories };
  loadComponents(editor, opts);
};

const loadComponents = (editor, options) => {
  const { labels, categories } = options;
if (labels?.block1) {
  editor.BlockManager.add("block1", {
    label: "Header",
    category: categories?.category1,
    attributes: { class: "block1-preview" },
    content: `
<!-- HEADER BLOCK -->
<div class="min-h-full">
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJ7N9wQSmEGBCDB7RCInkBLKcCjaQPWWAOQ&s" alt="Your Company">
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#dashboard" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
              <a href="#team" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
              <a href="#projects" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
              <a href="#calendar" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
              <a href="#reports" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Reports</a>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Notification -->
            <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <!-- Profile Dropdown -->
            <div class="relative ml-3">
              <div>
                <button id="user-menu-button" type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="User">
                </button>
              </div>
              <div id="dropdown-menu" class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                <a href="#profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</a>
                <a href="#settings" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Settings</a>
                <a href="#signout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Sign out</a>
              </div>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="mobile-menu-toggle inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Optional: Add section anchors -->
  <main class="p-6 bg-gray-50">
    <section id="dashboard"><h2 class="text-xl font-bold mb-2">Dashboard Section</h2></section>
    <section id="team"><h2 class="text-xl font-bold mb-2">Team Section</h2></section>
    <section id="projects"><h2 class="text-xl font-bold mb-2">Projects Section</h2></section>
    <section id="calendar"><h2 class="text-xl font-bold mb-2">Calendar Section</h2></section>
    <section id="reports"><h2 class="text-xl font-bold mb-2">Reports Section</h2></section>
  </main>
</div>
    `,
  });
}

  if (labels?.block2) {
    editor.BlockManager.add("block2", {
      label: "Main Banner",
      category: categories?.category2,
      attributes: { class: "block2-preview" },

      content: `<div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
  <div class="absolute inset-0">
    <img src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" class="object-cover object-center w-full h-full" />
    <div class="absolute inset-0 bg-black opacity-50"></div>
  </div>
  
  <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
    <h1 class="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Website</h1>
    <p class="text-lg text-gray-300 mb-8">Discover amazing features and services that await you.</p>
    <a href="#" class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</a>
  </div>
</div>
`,
    });
  }
  if (labels?.block11) {
    editor.BlockManager.add("block11", {
      label: "Main Banner",
      category: categories?.category2,
      attributes: { class: "block11-preview" },

      content: `<div class="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" class="absolute inset-0 w-full h-full object-cover" />
      <div class="min-h-[300px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        <h2 class="sm:text-4xl text-2xl font-bold mb-6">Explore the World</h2>
        <p class="text-lg text-center text-gray-200">Embark on unforgettable journeys. Book your dream vacation today!</p>
        <a href="javascript:void(0)"
          class="mt-8 bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">
          Book Now
        </a>
      </div>
    </div>`,
    });
  }
  if (labels?.block3) {
    editor.BlockManager.add("block3", {
      label: "Contact Form",
      category: categories?.category3,
      attributes: { class: "block3-preview" },

      content: `<div id="contact" class="relative w-3/4 min-h-screen bg-transparent text-black">

<!-- wrapper -->
<div class="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
    <!-- Contact Me -->
    <form action="#" class="w-full md:w-1/2 border border-gray-900 p-6 bg-transparent">
    <h2 class="text-2xl pb-3 font-semibold">
        Send Message
    </h2>
    <div>
        <div class="flex flex-col mb-3">
        <label for="name">Name</label>
        <input 
            type="text" id="name" 
            class="px-3 py-2 bg-gray-200 border border-gray-900 focus:border-gray-500 focus:outline-none focus:bg-gray-400 focus:text-gray-800 rounded"
            autocomplete="off"
        >
        </div>
        <div class="flex flex-col mb-3">
        <label for="email">Email</label>
        <input 
            type="text" id="email" 
            class="px-3 py-2 bg-gray-200 border border-gray-800 focus:border-gray-500 focus:outline-none focus:bg-gray-400 focus:text-gray-800 rounded"
            autocomplete="off"
        >
        </div>
        <div class="flex flex-col mb-3">
        <label for="message">Message</label>
        <textarea 
            rows="4" id="message" 
            class="px-3 py-2 bg-gray-200 border border-gray-800 focus:border-gray-500 focus:outline-none focus:bg-gray-400 focus:text-gray-800 rounded"
        ></textarea>
        </div>
    </div>
    <div class="w-full pt-3">
        <button type="submit" class="w-full bg-gray-900 border border-gray-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-gray-700 hover:text-white text-xl cursor-pointer">
        Submit
        </button>
    </div>
    </form>
</div>
</div>`,
    });
  }
  if (labels?.block4) {
    editor.BlockManager.add("block4", {
      label: "File Upload",
      category: categories?.category4,
      attributes: { class: "block4-preview" },

      content: `
      <form class="max-w-lg mx-auto">
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
  <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
  
</form>`,
    });
  }
  if (labels?.block5) {
    editor.BlockManager.add("block5", {
      label: "Product",
      category: categories?.category5,
      attributes: { class: "block5-preview" },

      content: `<div class="flex flex-wrap justify-around w-full px-4">
  <div class="bg-slate-200 rounded-2xl overflow-hidden shadow-lg min-w-[200px] flex-1 mx-2 my-4 sm:w-full md:[50%]" >
    <div class="relative px-3 py-3">
        <img style={{height:'10px'}} class="inline-block w-full max-h-72 rounded-lg object-cover mx-auto" src="https://images.pexels.com/photos/4227490/pexels-photo-4227490.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Product Image">
        <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
        </div>
    </div>
    <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Product Title</h3>
        <p class="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
            vel eros fermentum faucibus sit amet euismod lorem.</p>
        <div class="flex items-center justify-between">
            <span class="font-bold text-lg">$19.99</span>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
            </button>
        </div>
    </div>
</div>
<div class="bg-slate-200 rounded-2xl overflow-hidden shadow-lg flex-1 min-w-[200px] mx-2 my-4">
    <div class="relative px-3 py-3">
        <img style={{height:'10px'}} class="inline-block w-full max-h-72 rounded-lg object-cover mx-auto" src="https://images.pexels.com/photos/4227490/pexels-photo-4227490.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Product Image">
        <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
        </div>
    </div>
    <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Product Title</h3>
        <p class="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
            vel eros fermentum faucibus sit amet euismod lorem.</p>
        <div class="flex items-center justify-between">
            <span class="font-bold text-lg">$19.99</span>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
            </button>
        </div>
    </div>
</div>
<div class="bg-slate-200 rounded-2xl overflow-hidden shadow-lg flex-1 min-w-[200px] mx-2 my-4">
    <div class="relative px-3 py-3">
        <img style={{height:'10px'}} class="inline-block w-full max-h-72 rounded-lg object-cover mx-auto" src="https://images.pexels.com/photos/4227490/pexels-photo-4227490.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Product Image">
        <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
        </div>
    </div>
    <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Product Title</h3>
        <p class="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
            vel eros fermentum faucibus sit amet euismod lorem.</p>
        <div class="flex items-center justify-between">
            <span class="font-bold text-lg">$19.99</span>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
            </button>
        </div>
    </div>
</div>
<div class="bg-slate-200 rounded-2xl overflow-hidden shadow-lg flex-1 min-w-[200px] mx-2 my-4">
    <div class="relative px-3 py-3">
        <img style={{height:'10px'}} class="inline-block w-full max-h-72 rounded-lg object-cover mx-auto" src="https://images.pexels.com/photos/4227490/pexels-photo-4227490.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Product Image">
        <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
        </div>
    </div>
    <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Product Title</h3>
        <p class="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
            vel eros fermentum faucibus sit amet euismod lorem.</p>
        <div class="flex items-center justify-between">
            <span class="font-bold text-lg">$19.99</span>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
            </button>
        </div>
    </div>
</div>
</div>
`,
    });
  }
  if (labels?.block6) {
    editor.BlockManager.add("block6", {
      label: "Subscription",
      category: categories?.category5,
      attributes: { class: "block6-preview" },

      content: `

<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
<h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Standard plan</h5>
<div class="flex items-baseline text-gray-900 dark:text-white">
<span class="text-3xl text-gray-400 font-semibold">$</span>
<span class="text-5xl text-gray-400 font-extrabold tracking-tight">49</span>
<span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
</div>
<ul role="list" class="space-y-5 my-7">
<li class="flex items-center">
<svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">2 team members</span>
</li>
<li class="flex">
<svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">20GB Cloud storage</span>
</li>
<li class="flex">
<svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Integration help</span>
</li>
<li class="flex line-through decoration-gray-500">
<svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 ms-3">Sketch Files</span>
</li>
<li class="flex line-through decoration-gray-500">
<svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 ms-3">API Access</span>
</li>
<li class="flex line-through decoration-gray-500">
<svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 ms-3">Complete documentation</span>
</li>
<li class="flex line-through decoration-gray-500">
<svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
<span class="text-base font-normal leading-tight text-gray-500 ms-3">24×7 phone & email support</span>
</li>
</ul>
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-3 inline-flex justify-center w-full text-center">Choose plan</button>
</div>
`,
    });
  }
  if (labels?.block7) {
    editor.BlockManager.add("block7", {
      label: "Product",
      category: categories?.category5,
      attributes: { class: "block7-preview" },

      content: `<div class="flex flex-col justify-center h-screen">
	<div
		class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
		<div class="w-full md:w-1/3 bg-white grid place-items-center">
			<img src="./placeholder-images-product-1_large.webp" alt="tailwind logo" class="rounded-xl" />
    </div>
			<div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
				<div class="flex justify-between item-center">
					<p class="text-gray-500 font-medium hidden md:block">Vacations</p>
					<div class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<p class="text-gray-600 font-bold text-sm ml-1">
							4.96
							<span class="text-gray-500 font-normal">(76 reviews)</span>
						</p>
					</div>
					<div class="">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clip-rule="evenodd" />
						</svg>
					</div>
					<div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
						Superhost</div>
				</div>
				<h3 class="font-black text-gray-800 md:text-3xl text-xl">The Majestic and Wonderful Bahamas</h3>
				<p class="md:text-lg text-gray-500 text-base">The best kept secret of The Bahamas is the country’s sheer
					size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
				<p class="text-xl font-black text-gray-800">
					$110
					<span class="font-normal text-gray-600 text-base">/night</span>
				</p>
			</div>
		</div>
	</div>`,
    });
  }
  if (labels?.block8) {
    editor.BlockManager.add("block8", {
      label: "Gallery",
      category: categories?.category6,
      attributes: { class: "block8-preview" },

      content: `<div class="bg-white dark:bg-gray-800 max-h-[75%] py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            <!-- image - start -->
            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                <img src="./ImageGallery.avif" loading="lazy" alt="Gallery image" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Text</span>
            </a>
            <!-- image - end -->

            <!-- image - start -->
            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                <img src="./ImageGallery.avif" loading="lazy" alt="gallery image" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Text</span>
            </a>
            <!-- image - end -->

            <!-- image - start -->
            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                <img src="./ImageGallery.avif" loading="lazy" alt="gallery image" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Text</span>
            </a>
            <!-- image - end -->

            <!-- image - start -->
            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                <img src="./ImageGallery.avif" loading="lazy" alt="gallery image" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Text</span>
            </a>
            <!-- image - end -->
        </div>
    </div>
</div>`,
    });
  }
  if (labels?.block9) {
    editor.BlockManager.add("block9", {
      label: "Testimonials",
      category: categories?.category7,
      attributes: { class: "block9-preview" },

      content: `<!-- Container for demo purpose -->
<div class="container my-24 mx-auto md:px-6">
  <!-- Section: Design Block -->
  <section class="mb-32 text-center">
    <h2 class="mb-12 pb-4 text-center text-3xl font-bold">Testimonials</h2>

    <div class="grid gap-6 md:grid-cols-3 xl:gap-x-12">
      <div class="mb-6 lg:mb-0">
        <div
          class="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex">
            <div
              class="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <img src="./person-Placeholder.png" class="w-full" />
              <a href="#!">
                <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                </div>
              </a>
            </div>
          </div>
          <div class="p-6 bg-gray-100">
            <h5 class="mb-2 text-lg font-bold">John Doe</h5>
            <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
              Web Developer
            </h6>
            <ul class="mb-6 flex justify-center">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m480 757 157 95-42-178 138-120-182-16-71-168v387ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
            </ul>
            <p>
              Ut pretium ultricies dignissim. Sed sit amet mi eget urna
              placerat vulputate. Ut vulputate est non quam dignissim
              elementum. Donec a ullamcorper diam.
            </p>
          </div>
        </div>
      </div>

      <div class="mb-6 lg:mb-0">
        <div
          class="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex">
            <div
              class="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <img src="./person-Placeholder.png" class="w-full" />
              <a href="#!">
                <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                </div>
              </a>
            </div>
          </div>
          <div class="p-6 bg-gray-100">
            <h5 class="mb-2 text-lg font-bold">Halley Frank</h5>
            <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
              Marketing Specialist
            </h6>
            <ul class="mb-6 flex justify-center">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z" />
                </svg>
              </li>
            </ul>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium accusamus contestatur voluptatum
              deleniti atque corrupti.
            </p>
          </div>
        </div>
      </div>

      <div class="mb-0">
        <div
          class="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex">
            <div
              class="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <img src="./person-Placeholder.png" class="w-full" />
              <a href="#!">
                <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                </div>
              </a>
            </div>
          </div>
          <div class="p-6 bg-gray-100">
            <h5 class="mb-2 text-lg font-bold">Lisa Trey</h5>
            <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
              Public Relations
            </h6>
            <ul class="mb-6 flex justify-center">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                  <path fill="currentColor"
                    d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </li>
            </ul>
            <p>
              Enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid commodi quis
              nostrum minima.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Section: Design Block -->
</div>
<!-- Container for demo purpose -->`,
    });
  }
  if (labels?.block10) {
    editor.BlockManager.add("block10", {
      label: "Testimonial card",
      category: categories?.category7,
      attributes: { class: "block10-preview" },
      content: `<div class="p-4">
  <figure class="md:flex max-w-2xl rounded-xl p-8 md:p-0 dark:bg-slate-800 text-black">
    <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto object-cover" src="./person-Placeholder.png" alt="testimony image" width="384" height="512">
    <div class="pt-6 text-black md:p-8 text-center md:text-left space-y-4 bg-gray-100 ">
      <blockquote>
        <p class="text-lg  font-medium ">
          “Tailwind CSS is the only framework that I've seen scale
          on large teams. It’s easy to customize, adapts to any design,
          and the build size is tiny.”
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-sky-500 dark:text-sky-400">
          Sarah Dayan
        </div>
        <div class="text-bg-slate-950 dark:text-slate-400">
          Staff Engineer, Algolia
        </div>
      </figcaption>
    </div>
  </figure>
</div>`,
    });
  }
  if (labels?.block13) {
    editor.BlockManager.add("block13", {
      label: "BlogCom",
      category: categories?.category8,
      attributes: { class: "block13-preview" },
      content: `
        <section class="py-16 bg-gray-100 text-center">
          <h1 class="text-3xl font-bold mb-8">Latest Blog Posts</h1>
          <div class="flex justify-center gap-8">
            <article class="bg-white rounded-lg shadow-lg p-6 w-80">
              <img class="rounded-md w-full h-48 object-cover mb-4" src="https://via.placeholder.com/300" alt="Blog Image"/>
              <h2 class="text-xl font-semibold mb-2">Sample Blog Title</h2>
              <p class="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut urna at justo aliquam ullamcorper.</p>
              <a href="#" class="text-indigo-600 font-medium hover:underline">Read More</a>
            </article>
            <article class="bg-white rounded-lg shadow-lg p-6 w-80">
              <img class="rounded-md w-full h-48 object-cover mb-4" src="https://via.placeholder.com/300" alt="Blog Image"/>
              <h2 class="text-xl font-semibold mb-2">Another Blog Title</h2>
              <p class="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut urna at justo aliquam ullamcorper.</p>
              <a href="#" class="text-indigo-600 font-medium hover:underline">Read More</a>
            </article>
          </div>
        </section>
      `,
    });
  }
  if (labels?.block14) {
    editor.BlockManager.add("block14", {
      label: "About Page - Team",
      category: categories?.category8,
      attributes: { class: "block14-preview" },
      content: `
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Team</h2>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Meet the talented people behind our success.
            </p>
          </div>
          
          <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <!-- Team Member 1 -->
            <div class="bg-gray-50 rounded-lg overflow-hidden shadow">
              <img class="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="Team member">
              <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900">Jane Cooper</h3>
                <p class="mt-1 text-sm text-gray-500">CEO & Founder</p>
                <p class="mt-2 text-gray-600">Jane has over 15 years of experience in the industry and leads our company with vision.</p>
              </div>
            </div>
            
            <!-- Team Member 2 -->
            <div class="bg-gray-50 rounded-lg overflow-hidden shadow">
              <img class="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Team member">
              <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900">John Smith</h3>
                <p class="mt-1 text-sm text-gray-500">CTO</p>
                <p class="mt-2 text-gray-600">John drives our technical strategy and ensures we're always innovating.</p>
              </div>
            </div>
            
            <!-- Team Member 3 -->
            <div class="bg-gray-50 rounded-lg overflow-hidden shadow">
              <img class="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" alt="Team member">
              <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900">Emily Johnson</h3>
                <p class="mt-1 text-sm text-gray-500">Marketing Director</p>
                <p class="mt-2 text-gray-600">Emily leads our marketing efforts and connects us with our customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
    });
  }

  if (labels?.block15) {
    editor.BlockManager.add("block15", {
      label: "About Page - Mission",
      category: categories?.category8,
      attributes: { class: "block15-preview" },
      content: `
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission & Values
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're committed to making a difference through our work.
            </p>
          </div>

          <div class="mt-10">
            <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div class="bg-white p-6 rounded-lg shadow">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="mt-5">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Our Mission</h3>
                  <p class="mt-2 text-base text-gray-500">
                    To empower businesses and individuals through innovative solutions that simplify complex problems and drive meaningful results.
                  </p>
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="mt-5">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Our Values</h3>
                  <p class="mt-2 text-base text-gray-500">
                    Integrity, innovation, and customer focus are at the heart of everything we do. We believe in transparency and delivering exceptional value.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="mt-10 bg-white p-8 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Our Story</h3>
              <div class="prose prose-indigo text-gray-500">
                <p>
                  Founded in 2015, we started as a small team with a big vision. Today, we've grown to serve clients across multiple industries, but we've never lost our startup spirit and commitment to excellence.
                </p>
                <p class="mt-4">
                  Our journey hasn't always been easy, but every challenge has made us stronger and more determined to deliver the best possible solutions for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
    });
  }

  if (labels?.block16) {
    editor.BlockManager.add("block16", {
      label: "Footer - Basic",
      category: categories?.category8,
      attributes: { class: "block16-preview" },
      content: `
      <footer class="bg-gray-800 text-white">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Products</h3>
              <ul class="mt-4 space-y-4">
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">API</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul class="mt-4 space-y-4">
                <li><a href="#" class="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul class="mt-4 space-y-4">
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" class="text-base text-gray-300 hover:text-white">GDPR</a></li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe</h3>
              <p class="mt-4 text-base text-gray-300">Get the latest news and updates.</p>
              <form class="mt-4 sm:flex sm:max-w-md">
                <input type="email" name="email" id="email" class="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400" placeholder="Enter your email">
                <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button type="submit" class="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          
          <div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div class="flex space-x-6 md:order-2">
              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
            <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    `
    });
  }

  if (labels?.block17) {
    editor.BlockManager.add("block17", {
      label: "Footer - Minimal",
      category: categories?.category8,
      attributes: { class: "block17-preview" },
      content: `
      <footer class="bg-white">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div class="flex justify-center space-x-6 md:order-2">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
            <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    `
    });
  }

  if (labels?.block18) {
    editor.BlockManager.add("block18", {
      label: "Profile - Dashboard",
      category: categories?.category8,
      attributes: { class: "block18-preview" },
      content: `
      <div class="min-h-screen bg-gray-100">
        <div class="bg-indigo-600 pb-32">
          <header class="py-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 class="text-3xl font-bold text-white">Account Settings</h1>
            </div>
          </header>
        </div>

        <main class="-mt-32">
          <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg shadow overflow-hidden lg:grid lg:grid-cols-12 lg:divide-x">
              
              <!-- Sidebar -->
              <aside class="py-6 lg:col-span-3">
                <nav class="space-y-1">
                  <a href="#" class="bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-100 group border-l-4 px-3 py-2 flex items-center text-sm font-medium">
                    <svg class="text-indigo-500 flex-shrink-0 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Profile</span>
                  </a>
                  <a href="#" class="text-gray-700 hover:bg-gray-50 group border-l-4 border-transparent px-3 py-2 flex items-center text-sm font-medium">
                    <svg class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Account</span>
                  </a>
                  <a href="#" class="text-gray-700 hover:bg-gray-50 group border-l-4 border-transparent px-3 py-2 flex items-center text-sm font-medium">
                    <svg class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Billing</span>
                  </a>
                  <a href="#" class="text-gray-700 hover:bg-gray-50 group border-l-4 border-transparent px-3 py-2 flex items-center text-sm font-medium">
                    <svg class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Security</span>
                  </a>
                </nav>
              </aside>

              <!-- Main content -->
              <div class="lg:col-span-9 p-6">
                <div class="mb-8">
                  <h2 class="text-lg font-medium text-gray-900">Profile</h2>
                  <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                </div>

                <div class="flex flex-col md:flex-row gap-6">
                  <div class="md:w-1/3">
                    <label class="block text-sm font-medium text-gray-700">Photo</label>
                    <div class="mt-2 flex items-center">
                      <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img class="h-full w-full object-cover" src="https://via.placeholder.com/150" alt="Profile" />
                      </span>
                      <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                        Change
                      </button>
                    </div>
                  </div>

                  <div class="md:w-2/3 space-y-6">
                    <div>
                      <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">example.com/</span>
                        <input type="text" name="username" id="username" autocomplete="username" value="janesmith" class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                      </div>
                    </div>

                    <div>
                      <label for="about" class="block text-sm font-medium text-gray-700">About</label>
                      <textarea id="about" name="about" rows="3" class="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</textarea>
                      <p class="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    `,
    });
  }


};
