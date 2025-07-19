import React from "react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface ProductTypeProps {
	value: string;
	label: string;
}

const productTypes: ProductTypeProps[] = [
	{
		value: "hosting",
		label: "Hosting",
	},
	{
		value: "software",
		label: "Software",
	},
	{
		value: "hardware",
		label: "Hardware",
	},
];

const SearchBar = ({ className }: { className?: string }) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("hosting");

	return (
		<form action="submit" className={`flex items-center p-1 w-full bg-darkgreen rounded-full ${className}`}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="cursor-pointer text-offwhite p-0">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="px-5 justify-between bg-transparent shadow-none border-0">
						{value && productTypes.find((type) => type.value === value)?.label}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0 bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
					<Command>
						<CommandList>
							<CommandEmpty>No category found.</CommandEmpty>
							<CommandGroup>
								{productTypes.map((type) => (
									<CommandItem
										key={type.value}
										value={type.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);
										}}
										className="font-QuickSand text-background dark:text-offwhite hover:bg-background/5 dark:hover:bg-offwhite/5">
										{type.label}
										<Check className={cn("ml-auto", value === type.value ? "opacity-100" : "opacity-0")} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<input
				type="text"
				placeholder="Search Product"
				className="rounded-r-full p-2 w-full bg-offwhite text-black text-xs outline-0 md:text-sm md:h-11"
			/>
		</form>
	);
};

export default SearchBar;
