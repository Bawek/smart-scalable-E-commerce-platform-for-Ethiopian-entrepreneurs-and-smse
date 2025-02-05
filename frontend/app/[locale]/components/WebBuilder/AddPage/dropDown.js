"use client";

import * as React from "react";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {RxSection} from "react-icons/rx";
import {RiPagesLine} from "react-icons/ri";
import {LiaSitemapSolid} from "react-icons/lia";
import {TbCategoryFilled} from "react-icons/tb";
import { DialogDemo } from "./AddItem";
import { ButtonWithIcon } from "./Button";
import { CategoryDialog } from "./AddCategory";

export function DropdownMenuRadioGroupDemo() {
	const [position, setPosition] = React.useState("bottom");
	// <RxSection size={24} /> Section
{/* <RiPagesLine size={24} /> Page */}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{" "}
					<i className="fas fa-plus-circle fa-lg"></i>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 font-extrabold text-xl gap-2 flex flex-col">
				<DialogDemo />
				<CategoryDialog />
				<DialogDemo />
				<CategoryDialog />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
