'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command';
const FilterLayout = () => {
    const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];
  return (
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup heading="Product Suggestions">
              {products.map((product, index) => (
                <CommandItem key={index}>{product}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        
  );
};

export default FilterLayout;
