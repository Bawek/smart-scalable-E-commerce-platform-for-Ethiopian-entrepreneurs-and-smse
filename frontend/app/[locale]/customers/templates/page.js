'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Templates = () => {
  // Mock data - replace with actual data from your API
  const templates = [
    { id: 1, name: "Modern Minimalist", price: "Free", category: "free", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIvu7fGhIyiqSpzyAFX2dZZJWModa3JEhUug&s" },
    { id: 2, name: "Professional Suite", price: "Premium", category: "premium", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwaSh37psyyHn1YAdj7NvskY6OYBdasObE6Q&s" },
    { id: 3, name: "Boutique Style", price: "Free", category: "free", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IdjA_k2zhWPc0u0nuiImnnd-Evy188Yauw&s" },
    { id: 4, name: "Tech Innovator", price: "Premium", category: "premium", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMwNqWTqYNh-9gvCbsD6rCKxqmiUny_WC8yw&s" },
    // Add more templates...
];


  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 ">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Shop Templates</h1>
        <p className="text-muted-foreground mb-6">
          Choose from our collection of professional templates to start your online shop
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          
          <div className="flex gap-2">
            <Button
            className={`${selectedCategory === "all" ? "bg-orange-700" : "bg-white"} text-black hover:bg-orange-800`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            <Button
            className={`${selectedCategory === "free" ? "bg-orange-700" : "bg-white"} text-black hover:bg-orange-800`}
            onClick={() => setSelectedCategory("free")}
            >
              Free
            </Button>
            <Button
            className={`${selectedCategory === "premium" ? "bg-orange-700" : "bg-white"} text-black hover:bg-orange-800`}
            onClick={() => setSelectedCategory("premium")}
            >
              Premium
            </Button>
          </div>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No templates found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-muted">
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.category === "premium" && (
                  <Badge className="absolute top-2 right-2">Premium</Badge>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {template.price === "Free" ? "Free Forever" : "Premium Template"}
                  </span>
                  <Button 
                  className="bg-orange-700 hover:bg-orange-800"
                  >
                    {template.price === "Free" ? "Use Template" : "Get Premium"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Templates;